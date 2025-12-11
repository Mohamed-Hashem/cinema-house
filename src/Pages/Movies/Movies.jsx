import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from "react";
import { LoadingSpinner } from "../../Components/shared";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllData } from "./../../Redux/Actions/Actions";
import Movie from "./Movie";

const Movies = () => {
    const [page, setPage] = useState(1);
    const [prevY, setPrevY] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector((state) => state.movies);
    const loadingRef = useRef(null);
    const observerRef = useRef(null);

    // Fetch movies function
    const getMovies = useCallback(
        (pageNum) => {
            dispatch(getAllData(pageNum, "movie"));
        },
        [dispatch]
    );

    // Initial fetch
    useEffect(() => {
        window.scrollTo(0, 0);
        getMovies(1);
        setIsLoading(true);
    }, [getMovies]);

    // Intersection observer for infinite scroll
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0,
        };

        const handleObserver = (entities) => {
            const y = entities[0].boundingClientRect.y;

            if (prevY > y) {
                const nextPage = page + 1;
                getMovies(nextPage);
                setPage(nextPage);
            }
            setPrevY(y);
        };

        observerRef.current = new IntersectionObserver(handleObserver, options);

        if (loadingRef.current) {
            observerRef.current.observe(loadingRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [prevY, page, getMovies]);

    // Memoized navigation handler
    const goToMovieAbout = useCallback(
        (movie) => {
            window.scrollTo(0, 0);
            history.push(`/movies/${movie.id}`, movie);
        },
        [history]
    );

    // Filter movies with posters
    const filteredMovies = useMemo(() => movies.filter((movie) => movie.poster_path), [movies]);

    return (
        <section className="container movies" style={{ minHeight: "67vh" }}>
            {isLoading && filteredMovies.length > 0 ? (
                <div className="row">
                    {filteredMovies.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                            goToMovieAbout={goToMovieAbout}
                            height="350"
                        />
                    ))}
                </div>
            ) : !isLoading ? (
                <LoadingSpinner type="Bars" color="#00BFFF" height={100} width={100} />
            ) : null}

            <div ref={loadingRef} style={{ height: "100px", margin: "30px" }}>
                {isLoading && (
                    <span className="py-2 text-center">
                        <LoadingSpinner type="Bars" color="#00BFFF" height={80} width={80} />
                    </span>
                )}
            </div>
        </section>
    );
};

export default memo(Movies);
