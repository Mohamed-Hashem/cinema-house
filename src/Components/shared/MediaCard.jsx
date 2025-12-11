import React, { memo, useCallback } from "react";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/468x700/1E2D55?Text=No+Image";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

/**
 * Unified media card component for displaying movies, TV series, and actors
 */
const MediaCard = memo(({ item, onClick, type, height, showVote }) => {
    // Default values
    const mediaType = type || "movie";
    const cardHeight = height || "250";
    const displayVote = showVote !== undefined ? showVote : true;

    const style =
        cardHeight === "350" ? "col-xl-3 col-lg-4 col-md-6" : "col-xl-2 col-lg-3 col-md-4";

    const handleClick = useCallback(() => onClick(item), [onClick, item]);

    // Determine image path based on type
    const imagePath = mediaType === "person" ? item.profile_path : item.poster_path;
    const imageSrc = imagePath ? `${TMDB_IMAGE_BASE}/${imagePath}` : PLACEHOLDER_IMAGE;

    // Get display name
    const displayName = item.title || item.name;

    // Vote styling (only for movies and TV shows)
    const shouldShowVote = displayVote && mediaType !== "person" && imagePath !== null;
    const voteClass = shouldShowVote ? (item.vote_average >= 7 ? "vote vote1" : "vote vote2") : "";

    return (
        <div
            className={`item ${style} col-sm-6 my-2 card card-body`}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            aria-label={`View details for ${displayName}`}
        >
            <div className="text-center position-relative mb-2">
                <div className="captionLayer overflow-hidden mb-2">
                    <img
                        src={imageSrc}
                        width="100%"
                        height={cardHeight}
                        alt={displayName}
                        title={displayName}
                        loading="lazy"
                    />
                    <div className="item-layer position-absolute w-100 h-100"></div>
                </div>

                <b>{displayName}</b>
                {shouldShowVote && (
                    <span className={voteClass}>{Number(item.vote_average).toFixed(1)}</span>
                )}
            </div>
        </div>
    );
});

MediaCard.displayName = "MediaCard";

export default MediaCard;
