import React, { memo, useCallback, useState } from "react";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/154x231/1E2D55?text=No+Poster";

const Serie = memo(({ serie, goToSeriesAbout, index = 0 }) => {
    const style = "col-xl-2 col-lg-3 col-md-4";
    const displayName = serie.title || serie.name;
    const [imageError, setImageError] = useState(false);

    const handleClick = useCallback(() => goToSeriesAbout(serie), [goToSeriesAbout, serie.id]);
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToSeriesAbout(serie);
            }
        },
        [goToSeriesAbout, serie.id]
    );

    const voteClass =
        serie.poster_path !== null ? (serie.vote_average >= 7 ? "vote vote1" : "vote vote2") : "";

    return (
        <article
            className={`item ${style} col-sm-6 my-2 card card-body mb-3`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={`${displayName}, Rating: ${serie.vote_average?.toFixed(1) || "N/A"}`}
        >
            <div className="text-center position-relative">
                <div className="captionLayer overflow-hidden mb-2">
                    <img
                        src={
                            serie.poster_path && !imageError
                                ? `https://image.tmdb.org/t/p/w154/${serie.poster_path}`
                                : PLACEHOLDER_IMAGE
                        }
                        alt={`${displayName} poster`}
                        width="154"
                        height="231"
                        loading={index < 6 ? "eager" : "lazy"}
                        decoding="async"
                        fetchpriority={index < 3 ? "high" : undefined}
                        onError={() => setImageError(true)}
                        style={{ objectFit: "cover" }}
                    />
                    <div
                        className="item-layer position-absolute w-100 h-100"
                        aria-hidden="true"
                    ></div>
                </div>

                <b>{displayName}</b>
                <span className={voteClass} aria-hidden="true">
                    {serie.poster_path !== null ? Number(serie.vote_average).toFixed(1) : ""}
                </span>
            </div>
        </article>
    );
});

Serie.displayName = "Serie";

export default Serie;
