import React, { useEffect, useState, useCallback, useMemo, memo } from "react";
import { LoadingSpinner } from "../../Components/shared";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "./../../Redux/Actions/Actions";
import Movie from "../Movies/Movie";
import Serie from "../Series/Serie";
import Actor from "../Actors/Actor";

// Memoized section header component
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
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const movies = useSelector((state) => state.movies);
    const series = useSelector((state) => state.series);
    const actors = useSelector((state) => state.actors);

    useEffect(() => {
        window.scrollTo(0, 0);

        dispatch(getTrending("movie"));
        dispatch(getTrending("tv"));
        dispatch(getTrending("person"));

        setIsLoading(true);

        return () => {
            setIsLoading(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Memoized navigation handlers
    const goToMovieAbout = useCallback(
        (movie) => {
            window.scrollTo(0, 0);
            history.push(`/movies/${movie.id}`, movie);
        },
        [history]
    );

    const goToSeriesAbout = useCallback(
        (series) => {
            window.scrollTo(0, 0);
            history.push(`/series/${series.id}`, series);
        },
        [history]
    );

    const goToActorsAbout = useCallback(
        (actor) => {
            window.scrollTo(0, 0);
            history.push(`/actors/${actor.id}`, actor);
        },
        [history]
    );

    // Memoized filtered data (only items with posters/profiles)
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

    return (
        <div className="container home" style={{ minHeight: "71vh" }}>
            {/* Movies Section */}
            {isLoading && filteredMovies.length > 0 ? (
                <div className="row">
                    <SectionHeader
                        title="Trending Movies to Watch now"
                        subtitle="Most Watched Movies"
                    />
                    {filteredMovies.map((movie) => (
                        <Movie
                            key={movie.id}
                            movie={movie}
                            goToMovieAbout={goToMovieAbout}
                            height="250"
                        />
                    ))}
                </div>
            ) : !isLoading ? (
                <LoadingSpinner />
            ) : null}

            {/* TV Series Section */}
            {isLoading && filteredSeries.length > 0 ? (
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
                    {filteredSeries.map((serie) => (
                        <Serie
                            key={serie.id}
                            serie={serie}
                            goToSeriesAbout={goToSeriesAbout}
                            height="250"
                        />
                    ))}
                </div>
            ) : !isLoading ? (
                <LoadingSpinner />
            ) : null}

            {/* Actors Section */}
            {isLoading && filteredActors.length > 0 ? (
                <div className="row mt-3">
                    <SectionHeader
                        title={
                            <>
                                Trending <br /> Actors and Actress
                            </>
                        }
                        subtitle="Most Popular Actors and Actress"
                    />
                    {filteredActors.map((actor) => (
                        <Actor
                            key={actor.id}
                            actor={actor}
                            goToActorsAbout={goToActorsAbout}
                            height="250"
                        />
                    ))}
                </div>
            ) : !isLoading ? (
                <LoadingSpinner />
            ) : null}
        </div>
    );
};

export default memo(Home);
