import React, { memo, useCallback } from "react";

const Serie = memo(({ serie, goToSeriesAbout, height = "250" }) => {
    const style = height === "350" ? "col-xl-3 col-lg-4 col-md-6" : "col-xl-2 col-lg-3 col-md-4";

    const handleClick = useCallback(() => goToSeriesAbout(serie), [goToSeriesAbout, serie]);

    const voteClass =
        serie.poster_path !== null ? (serie.vote_average >= 7 ? "vote vote1" : "vote vote2") : "";

    return (
        <div className={`item ${style} col-sm-6 my-2 card card-body mb-3`} onClick={handleClick}>
            <div className="text-center position-relative">
                <div className="captionLayer overflow-hidden mb-2">
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                        width="100%"
                        height={height}
                        alt={serie.title || serie.name}
                        title={serie.title || serie.name}
                        loading="lazy"
                    />
                    <div className="item-layer position-absolute w-100 h-100"></div>
                </div>

                <b>{serie.title || serie.name}</b>
                <span className={voteClass}>
                    {serie.poster_path !== null ? serie.vote_average : ""}
                </span>
            </div>
        </div>
    );
});

Serie.displayName = "Serie";

export default Serie;
