import React, { memo, useCallback } from "react";

const Movie = memo(({ movie, goToMovieAbout, height = "250" }) => {
    const style = height === "350" ? "col-xl-3 col-lg-4 col-md-6" : "col-xl-2 col-lg-3 col-md-4";

    const handleClick = useCallback(() => goToMovieAbout(movie), [goToMovieAbout, movie]);

    const voteClass =
        movie.poster_path !== null ? (movie.vote_average >= 7 ? "vote vote1" : "vote vote2") : "";

    return (
        <div className={`item ${style} col-sm-6 my-2 card card-body`} onClick={handleClick}>
            <div className="text-center position-relative mb-2">
                <div className="captionLayer overflow-hidden mb-2">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        width="100%"
                        height={height}
                        alt={movie.title || movie.name}
                        title={movie.title || movie.name}
                        loading="lazy"
                    />
                    <div className="item-layer position-absolute w-100 h-100"></div>
                </div>

                <b>{movie.title || movie.name}</b>
                <span className={voteClass}>
                    {movie.poster_path !== null ? movie.vote_average : ""}
                </span>
            </div>
        </div>
    );
});

Movie.displayName = "Movie";

export default Movie;
