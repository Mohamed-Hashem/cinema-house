import axios from "axios";
import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    memo,
    useMemo,
    useTransition,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../../Components/shared";

// Environment variables for TMDB API
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

// Custom hook for AbortController management
const useAbortController = () => {
    const controllerRef = useRef(null);

    const getController = useCallback(() => {
        // Abort previous request if exists
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        // Create new controller
        controllerRef.current = new AbortController();
        return controllerRef.current;
    }, []);

    const abort = useCallback(() => {
        if (controllerRef.current) {
            controllerRef.current.abort();
            controllerRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => abort();
    }, [abort]);

    return { getController, abort };
};

// Custom hook for Intersection Observer with better performance
const useInfiniteScroll = (callback, options = {}) => {
    const observerRef = useRef(null);
    const targetRef = useRef(null);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    callback();
                }
            },
            {
                root: options.root || null,
                rootMargin: options.rootMargin || "100px",
                threshold: options.threshold || 0,
            }
        );

        observerRef.current.observe(target);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [callback, options.root, options.rootMargin, options.threshold]);

    return targetRef;
};

// Optimized memoized search result item with stable reference comparison
const SearchResultItem = memo(
    ({ item, onNavigate }) => {
        const imagePath = item.poster_path || item.profile_path;
        const title = item.title || item.name;

        // Single navigation handler - more efficient than multiple callbacks
        const handleClick = useCallback(() => {
            onNavigate(item.media_type, item);
        }, [item, onNavigate]);

        // Compute vote class without useMemo for simple conditionals
        const voteClass =
            item.vote_average >= 7 ? "vote vote1" : item.vote_average > 0 ? "vote vote2" : "";

        if (!imagePath) return null;

        return (
            <article
                className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
                onClick={handleClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && handleClick()}
            >
                <div className="text-center position-relative mb-2">
                    <div className="captionLayer overflow-hidden mb-2">
                        <img
                            src={`${TMDB_IMAGE_URL}/w500/${imagePath}`}
                            className="w-100 h-100"
                            alt={title}
                            title={title}
                            loading="lazy"
                            decoding="async"
                        />
                        <div
                            className="item-layer position-absolute w-100 h-100"
                            aria-hidden="true"
                        />
                    </div>
                    <b>{title}</b>
                    {item.vote_average > 0 && (
                        <span className={voteClass} aria-label={`Rating: ${item.vote_average}`}>
                            {item.vote_average.toFixed(1)}
                        </span>
                    )}
                </div>
            </article>
        );
    },
    // Custom comparison function for better memoization
    (prevProps, nextProps) => {
        return (
            prevProps.item.id === nextProps.item.id &&
            prevProps.item.media_type === nextProps.item.media_type &&
            prevProps.onNavigate === nextProps.onNavigate
        );
    }
);

SearchResultItem.displayName = "SearchResultItem";

// Loading placeholder component
const LoadingPlaceholder = memo(() => (
    <LoadingSpinner type="Bars" color="#00BFFF" height={100} width={100} />
));

LoadingPlaceholder.displayName = "LoadingPlaceholder";

// Infinite scroll loader component
const InfiniteScrollLoader = memo(({ isVisible }) =>
    isVisible ? (
        <span className="py-2 text-center d-block">
            <LoadingSpinner type="Puff" color="#00BFFF" height={80} width={80} />
        </span>
    ) : null
);

InfiniteScrollLoader.displayName = "InfiniteScrollLoader";

const Search = () => {
    const [results, setResults] = useState([]);
    const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [, startTransition] = useTransition();

    const history = useHistory();
    const location = useLocation();
    const { getController, abort } = useAbortController();

    // Extract search key from URL - memoized
    const searchKey = useMemo(() => {
        return decodeURIComponent(location.pathname.slice(8));
    }, [location.pathname]);

    // Unified navigation handler - single stable reference
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

    // Optimized search function
    const fetchResults = useCallback(
        async (pageNum, query, isNewSearch = false) => {
            if (!query?.trim()) return;

            const controller = getController();

            try {
                if (isNewSearch) {
                    setStatus("loading");
                }

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

                if (newResults.length === 0 && pageNum === 1) {
                    history.push("/notfound");
                    return;
                }

                // Use functional update to avoid stale closure issues
                startTransition(() => {
                    setResults((prev) => (isNewSearch ? newResults : [...prev, ...newResults]));
                    setHasMore(pageNum < total_pages);
                    setStatus("success");
                });

                localStorage.setItem("searchQuery", query);
            } catch (error) {
                if (axios.isCancel(error) || error.name === "AbortError") {
                    return; // Silently ignore cancelled requests
                }
                console.error("Search error:", error);
                setStatus("error");
            }
        },
        [getController, history]
    );

    // Load more callback for infinite scroll
    const loadMore = useCallback(() => {
        if (hasMore && status === "success") {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchResults(nextPage, searchKey, false);
        }
    }, [hasMore, status, page, fetchResults, searchKey]);

    // Use custom infinite scroll hook
    const loadingRef = useInfiniteScroll(loadMore, {
        rootMargin: "200px",
        threshold: 0,
    });

    // Initial search effect
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
        setResults([]);
        setPage(1);
        setHasMore(true);
        setStatus("idle");
        fetchResults(1, searchKey, true);

        return abort;
    }, [searchKey, fetchResults, abort]);

    // Memoized filtered results (removes duplicates)
    const uniqueResults = useMemo(() => {
        const seen = new Set();
        return results.filter((item) => {
            const key = `${item.media_type}-${item.id}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [results]);

    // Render content based on status
    const renderContent = useMemo(() => {
        if (status === "loading" && results.length === 0) {
            return <LoadingPlaceholder />;
        }

        if (status === "error") {
            return (
                <div className="text-center text-white py-5">
                    <p>Something went wrong. Please try again.</p>
                </div>
            );
        }

        return uniqueResults.map((item) => (
            <SearchResultItem
                key={`${item.media_type}-${item.id}`}
                item={item}
                onNavigate={handleNavigate}
            />
        ));
    }, [status, results.length, uniqueResults, handleNavigate]);

    return (
        <section className="container tv" style={{ minHeight: "75.5vh" }}>
            <div className="row">
                {renderContent}

                <div
                    ref={loadingRef}
                    style={{ height: "100px", margin: "30px auto", width: "100%" }}
                    aria-hidden="true"
                >
                    <InfiniteScrollLoader isVisible={hasMore && status === "success"} />
                </div>
            </div>
        </section>
    );
};

export default memo(Search);
