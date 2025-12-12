import React, { useEffect, useState, useCallback, useMemo, memo, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "./../../Redux/Actions/Actions";
import { SkeletonCard } from "../../Components/shared";
import { generatePath } from "../../utils/routes";
import Movie from "../Movies/Movie";
import Serie from "../Series/Serie";
import Actor from "../Actors/Actor";

const SectionHeader = memo(({ title, subtitle }) => (
    <div className="col-md-4 col-sm-12 d-flex justify-content-center align-items-center">
        <div className="item">
            <div className="w-25 line mb-3"></div>
            <h1 className="mr-4">{title}</h1>
            <p className="secondFontColor">{subtitle}</p>
            <div className="w-100 line mb-4"></div>
        </div>
    </div>
));

SectionHeader.displayName = "SectionHeader";

const Home = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useDispatch();

    const movies = useSelector((state) => state.movies);
    const series = useSelector((state) => state.series);
    const actors = useSelector((state) => state.actors);

    useEffect(() => {
        window.scrollTo(0, 0);
        const hasData = movies.length > 0 && series.length > 0 && actors.length > 0;

        if (!hasData) {
            dispatch(getTrending("movie"));
            dispatch(getTrending("tv"));
            dispatch(getTrending("person"));
        }

        const timer = setTimeout(
            () => {
                setIsLoading(false);
            },
            hasData ? 100 : 1500
        );

        return () => {
            clearTimeout(timer);
        };
    }, [movies.length, series.length, actors.length, dispatch]);

    const isNavigatingRef = useRef(false);

    const goToMovieAbout = useCallback(
        (movie) => {
            if (isNavigatingRef.current) return;
            isNavigatingRef.current = true;
            history.push(generatePath.movie(movie.id), movie);
            requestAnimationFrame(() => {
                isNavigatingRef.current = false;
            });
        },
        [history]
    );

    const goToSeriesAbout = useCallback(
        (series) => {
            if (isNavigatingRef.current) return;
            isNavigatingRef.current = true;
            history.push(generatePath.series(series.id), series);
            requestAnimationFrame(() => {
                isNavigatingRef.current = false;
            });
        },
        [history]
    );

    const goToActorsAbout = useCallback(
        (actor) => {
            if (isNavigatingRef.current) return;
            isNavigatingRef.current = true;
            history.push(generatePath.actor(actor.id), actor);
            requestAnimationFrame(() => {
                isNavigatingRef.current = false;
            });
        },
        [history]
    );
    const filteredMovies = useMemo(
        () => movies.slice(0, 10).filter((movie) => movie.poster_path),
        [movies]
    );

    const filteredSeries = useMemo(
        () => series.slice(0, 10).filter((serie) => serie.poster_path),
        [series]
    );

    const filteredActors = useMemo(
        () => actors.slice(0, 10).filter((actor) => actor.profile_path),
        [actors]
    );

    // Show loading spinner while data is being fetched
    if (isLoading) {
        return (
            <div className="container home" style={{ minHeight: "71vh" }}>
                <div className="row">
                    <SectionHeader
                        title="Trending Movies to Watch now"
                        subtitle="Most Watched Movies"
                    />
                    <SkeletonCard count={10} />
                </div>

                <div className="row my-3">
                    <SectionHeader
                        title={
                            <>
                                Trending <br />
                                Series to Watch now
                            </>
                        }
                        subtitle="Most Watched Series"
                    />
                    <SkeletonCard count={10} />
                </div>

                <div className="row mt-3">
                    <SectionHeader
                        title={
                            <>
                                Trending <br /> Actors and Actress
                            </>
                        }
                        subtitle="Most Popular Actors and Actress"
                    />
                    <SkeletonCard count={10} />
                </div>
            </div>
        );
    }

    return (
        <div className="container home" style={{ minHeight: "71vh" }}>
            {filteredMovies.length > 0 && (
                <div className="row">
                    <SectionHeader
                        title="Trending Movies to Watch now"
                        subtitle="Most Watched Movies"
                    />
                    {filteredMovies.map((movie, index) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                            goToMovieAbout={goToMovieAbout}
                            index={index}
                        />
                    ))}
                </div>
            )}

            {filteredSeries.length > 0 && (
                <div className="row my-3">
                    <SectionHeader
                        title={
                            <>
                                Trending <br />
                                Series to Watch now
                            </>
                        }
                        subtitle="Most Watched Series"
                    />
                    {filteredSeries.map((serie, index) => (
                        <Serie
                            key={serie.id}
                            serie={serie}
                            goToSeriesAbout={goToSeriesAbout}
                            index={index}
                        />
                    ))}
                </div>
            )}

            {filteredActors.length > 0 && (
                <div className="row mt-3">
                    <SectionHeader
                        title={
                            <>
                                Trending <br /> Actors and Actress
                            </>
                        }
                        subtitle="Most Popular Actors and Actress"
                    />
                    {filteredActors.map((actor, index) => (
                        <Actor
                            key={actor.id}
                            actor={actor}
                            goToActorsAbout={goToActorsAbout}
                            index={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default memo(Home);
