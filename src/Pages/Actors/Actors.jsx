import React, { useState, useEffect, useCallback, useRef, useMemo, memo } from "react";
import { LoadingSpinner } from "../../Components/shared";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllData } from "./../../Redux/Actions/Actions";
import Actor from "./Actor";

const Actors = () => {
    const [page, setPage] = useState(1);
    const [prevY, setPrevY] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    const actors = useSelector((state) => state.actors);
    const loadingRef = useRef(null);
    const observerRef = useRef(null);

    // Fetch actors function
    const getActors = useCallback(
        (pageNum) => {
            dispatch(getAllData(pageNum, "person"));
        },
        [dispatch]
    );

    // Initial fetch
    useEffect(() => {
        window.scrollTo(0, 0);
        getActors(1);
        setIsLoading(true);
    }, [getActors]);

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
                getActors(nextPage);
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
    }, [prevY, page, getActors]);

    // Memoized navigation handler
    const goToActorsAbout = useCallback(
        (actor) => {
            window.scrollTo(0, 0);
            history.push(`/actors/${actor.id}`, actor);
        },
        [history]
    );

    // Filter actors with profile images
    const filteredActors = useMemo(() => actors.filter((actor) => actor.profile_path), [actors]);

    return (
        <section className="container people" style={{ minHeight: "71vh" }}>
            {isLoading ? (
                <div className="row">
                    {filteredActors.map((actor) => (
                        <Actor
                            key={actor.id}
                            actor={actor}
                            goToActorsAbout={goToActorsAbout}
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

export default memo(Actors);
