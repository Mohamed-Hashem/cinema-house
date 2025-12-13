import axios from "axios";
import React, { useState, useEffect, useCallback, useRef, memo, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../../Components/shared";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

const requestCache = new Map();
const CACHE_DURATION = 300000;

const useAbortController = () => {
    const controllerRef = useRef(null);

    const getController = useCallback(() => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
        return controllerRef.current;
    }, []);

    const abort = useCallback(() => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => abort();
    }, [abort]);

    return { getController, abort };
};

const useInfiniteScroll = (callback, options = {}) => {
    const observerRef = useRef(null);
    const targetRef = useRef(null);
    const callbackRef = useRef(callback);

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    callbackRef.current();
                }
            },
            {
                root: options.root || null,
                rootMargin: options.rootMargin || "300px",
                threshold: options.threshold || 0.1,
            }
        );

        observerRef.current.observe(target);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [options.root, options.rootMargin, options.threshold]);

    return targetRef;
};

const SearchResultItem = memo(
    ({ item, onNavigate, index = 0 }) => {
        const imagePath = item.poster_path || item.profile_path || item.backdrop_path;
        const title = item.title || item.name;
        const mediaType = item.media_type || "movie";

        const handleClick = useCallback(() => {
            onNavigate(mediaType, item);
        }, [item, onNavigate, mediaType]);

        if (!title) return null;

        const voteClass =
            item.vote_average >= 7 ? "vote vote1" : item.vote_average > 0 ? "vote vote2" : "";
        const ratingText = item.vote_average > 0 ? `, Rating: ${item.vote_average.toFixed(1)}` : "";

        return (
            <article
                className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
                aria-label={`${title}${ratingText}`}
            >
                <div className="text-center position-relative mb-2">
                    <div className="captionLayer overflow-hidden mb-2">
                        {imagePath ? (
                            <img
                                src={`${TMDB_IMAGE_URL}/w154/${imagePath}`}
                                width="154"
                                height="231"
                                alt={`${title} ${mediaType === "person" ? "photo" : "poster"}`}
                                loading={index < 6 ? "eager" : "lazy"}
                                decoding="async"
                                fetchpriority={index < 3 ? "high" : undefined}
                                onError={(e) => {
                                    e.target.style.display = "none";
                                    e.target.nextElementSibling?.classList.add("show");
                                }}
                                style={{ objectFit: "cover" }}
                            />
                        ) : null}
                        <div
                            className={imagePath ? "" : "show"}
                            style={{
                                width: 154,
                                height: 231,
                                backgroundColor: "#1E2D55",
                                display: imagePath ? "none" : "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#999",
                                fontSize: 12,
                                fontWeight: 500,
                            }}
                        >
                            {mediaType === "person" ? "No Photo" : "No Poster"}
                        </div>
                        <div
                            className="item-layer position-absolute w-100 h-100"
                            aria-hidden="true"
                        />
                    </div>
                    <b aria-hidden="true">{title}</b>
                    {item.vote_average > 0 && (
                        <span className={voteClass} aria-hidden="true">
                            {item.vote_average.toFixed(1)}
                        </span>
                    )}
                </div>
            </article>
        );
    },
    (prevProps, nextProps) =>
        prevProps.item.id === nextProps.item.id && prevProps.onNavigate === nextProps.onNavigate
);

SearchResultItem.displayName = "SearchResultItem";

const LoadingPlaceholder = memo(() => (
    <div
        className="text-center w-100"
        style={{ position: "relative", padding: "3rem 0", minHeight: 200 }}
    >
        <LoadingSpinner
            type="Bars"
            color="#00BFFF"
            height={100}
            width={100}
            className="d-inline-block"
        />
    </div>
));

const InfiniteScrollLoader = memo(({ isVisible }) =>
    isVisible ? (
        <div className="py-2 text-center" style={{ position: "relative" }}>
            <LoadingSpinner
                type="Puff"
                color="#00BFFF"
                height={80}
                width={80}
                className="d-inline-block"
            />
        </div>
    ) : null
);

const Search = () => {
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState("idle");
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const isLoadingRef = useRef(false);

    const history = useHistory();
    const location = useLocation();
    const { getController, abort } = useAbortController();

    const searchKey = useMemo(() => {
        return decodeURIComponent(location.pathname.slice(8));
    }, [location.pathname]);

    const handleNavigate = useCallback(
        (mediaType, item) => {
            window.scrollTo({ top: 0, behavior: "instant" });
            const routes = {
                movie: `/movies/${item.id}`,
                tv: `/series/${item.id}`,
                person: `/actors/${item.id}`,
            };
            history.push(routes[mediaType] || routes.movie, item);
        },
        [history]
    );

    const performSearch = useCallback(
        async (pageNum, query, isNewSearch = false) => {
            if (!query?.trim() || isLoadingRef.current) return;

            const cacheKey = `${query.trim()}-${pageNum}`;
            const cachedData = requestCache.get(cacheKey);

            if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
                const { results: newResults, total_pages } = cachedData.data;
                setResults((prev) => (isNewSearch ? newResults : [...prev, ...newResults]));
                setHasMore(pageNum < total_pages);
                if (isNewSearch) setStatus("success");
                return;
            }

            isLoadingRef.current = true;
            const controller = getController();

            try {
                if (isNewSearch) setStatus("loading");

                const response = await axios.get(`${TMDB_BASE_URL}/search/multi`, {
                    params: {
                        api_key: TMDB_API_KEY,
                        page: pageNum,
                        query: query.trim(),
                        include_adult: false,
                    },
                    signal: controller.signal,
                });

                const { results: newResults, total_pages } = response.data;

                requestCache.set(cacheKey, { data: response.data, timestamp: Date.now() });
                if (requestCache.size > 50) requestCache.delete(requestCache.keys().next().value);

                if (newResults.length === 0 && pageNum === 1) {
                    history.push("/notfound");
                    return;
                }

                setResults((prev) => (isNewSearch ? newResults : [...prev, ...newResults]));
                setHasMore(pageNum < total_pages);
                if (isNewSearch) setTimeout(() => setStatus("success"), 0);
                if (isNewSearch) localStorage.setItem("searchQuery", query);
            } catch (error) {
                if (!axios.isCancel(error)) {
                    console.error("Search error:", error);
                    setStatus("error");
                }
            } finally {
                isLoadingRef.current = false;
            }
        },
        [getController, history]
    );

    const loadMore = useCallback(() => {
        if (hasMore && status === "success" && !isLoadingRef.current) {
            setPage((prev) => prev + 1);
            performSearch(page + 1, searchKey, false);
        }
    }, [hasMore, status, page, performSearch, searchKey]);

    const loadingRef = useInfiniteScroll(loadMore, {
        rootMargin: "200px",
        threshold: 0,
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        isLoadingRef.current = false;
        setResults([]);
        setPage(1);
        setHasMore(true);
        setStatus("idle");

        if (searchKey?.trim()) {
            performSearch(1, searchKey, true);
        }

        return () => {
            abort();
            isLoadingRef.current = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchKey]);

    const uniqueResults = useMemo(() => {
        const seen = new Set();
        return results.filter((item) => {
            const key = `${item.media_type}-${item.id}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [results]);

    const renderContent = useMemo(() => {
        if (status === "loading" && results.length === 0) return <LoadingPlaceholder />;
        if (status === "error")
            return (
                <div className="text-center text-white py-5">
                    <p>Something went wrong. Please try again.</p>
                </div>
            );
        if (uniqueResults.length > 0) {
            return uniqueResults.map((item, index) => (
                <SearchResultItem
                    key={`${item.media_type}-${item.id}`}
                    item={item}
                    onNavigate={handleNavigate}
                    index={index}
                />
            ));
        }
        return null;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, uniqueResults, handleNavigate]);

    return (
        <section
            className="container series"
            style={{ minHeight: "75.5vh" }}
            aria-label="Search results"
        >
            <h1 className="sr-only">Search Results for "{searchKey}"</h1>
            <div className="row">
                {renderContent}
                <div
                    ref={loadingRef}
                    style={{ height: 100, margin: "30px auto", width: "100%" }}
                    aria-hidden="true"
                >
                    <InfiniteScrollLoader isVisible={hasMore && status === "success"} />
                </div>
            </div>
        </section>
    );
};

export default Search;
