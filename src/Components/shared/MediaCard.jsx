import React, { memo, useCallback, useState } from "react";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/154x231/1E2D55?text=No+Image";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w154";

const MediaCard = memo(
    ({ item, onClick, type = "movie", height = "231", showVote = true, index = 0 }) => {
        const [imgError, setImgError] = useState(false);
        const style =
            height === "350" ? "col-xl-3 col-lg-4 col-md-6" : "col-xl-2 col-lg-3 col-md-4";

        const handleClick = useCallback(() => onClick(item), [onClick, item]);
        const handleKeyDown = useCallback((e) => e.key === "Enter" && handleClick(), [handleClick]);

        const imagePath = type === "person" ? item.profile_path : item.poster_path;
        const imageSrc =
            imagePath && !imgError ? `${TMDB_IMAGE_BASE}/${imagePath}` : PLACEHOLDER_IMAGE;
        const displayName = item.title || item.name;

        const shouldShowVote = showVote && type !== "person" && imagePath;
        const voteClass = shouldShowVote
            ? item.vote_average >= 7
                ? "vote vote1"
                : "vote vote2"
            : "";

        return (
            <article
                className={`item ${style} col-sm-6 my-2 card card-body`}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
                aria-label={`${displayName}${shouldShowVote ? `, Rating: ${item.vote_average?.toFixed(1)}` : ""}`}
            >
                <div className="text-center position-relative mb-2">
                    <div className="captionLayer overflow-hidden mb-2">
                        <img
                            src={imageSrc}
                            width="154"
                            height={height}
                            alt={`${displayName} ${type === "person" ? "photo" : "poster"}`}
                            loading={index < 6 ? "eager" : "lazy"}
                            decoding="async"
                            fetchpriority={index < 3 ? "high" : undefined}
                            onError={() => setImgError(true)}
                            style={{ objectFit: "cover" }}
                        />
                        <div
                            className="item-layer position-absolute w-100 h-100"
                            aria-hidden="true"
                        />
                    </div>
                    <b>{displayName}</b>
                    {shouldShowVote && (
                        <span className={voteClass}>{item.vote_average.toFixed(1)}</span>
                    )}
                </div>
            </article>
        );
    }
);

MediaCard.displayName = "MediaCard";

export default MediaCard;
