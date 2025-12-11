import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from "react";
import { LoadingSpinner } from "../../Components/shared";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllData } from "./../../Redux/Actions/Actions";
import Serie from "./Serie";

const Series = () => {
    const [page, setPage] = useState(1);
    const [prevY, setPrevY] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const series = useSelector((state) => state.series);
    const loadingRef = useRef(null);
    const observerRef = useRef(null);

    // Fetch series function
    const getSeries = useCallback(
        (pageNum) => {
            dispatch(getAllData(pageNum, "tv"));
        },
        [dispatch]
    );

    // Initial fetch
    useEffect(() => {
        window.scrollTo(0, 0);
        getSeries(1);
        setIsLoading(true);
    }, [getSeries]);

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
                getSeries(nextPage);
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
    }, [prevY, page, getSeries]);

    // Memoized navigation handler
    const goToSeriesAbout = useCallback(
        (serie) => {
            window.scrollTo(0, 0);
            history.push(`/series/${serie.id}`, serie);
        },
        [history]
    );

    // Filter series with posters
    const filteredSeries = useMemo(() => series.filter((serie) => serie.poster_path), [series]);

    return (
        <section className="container tv" style={{ minHeight: "67vh" }}>
            {isLoading ? (
                <div className="row">
                    {filteredSeries.map((serie) => (
                        <Serie
                            key={serie.id}
                            serie={serie}
                            goToSeriesAbout={goToSeriesAbout}
                            height="350"
                        />
                    ))}
                </div>
            ) : (
                <LoadingSpinner type="Bars" color="#00BFFF" height={100} width={100} />
            )}

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

export default memo(Series);
