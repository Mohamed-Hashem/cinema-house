import React, { memo, useCallback, useState } from "react";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/154x231/1E2D55?text=No+Photo";

const Actor = memo(({ actor, goToActorsAbout, index = 0 }) => {
    const style = "col-xl-2 col-lg-3 col-md-4";
    const displayName = actor.name || actor.title;
    const [imageError, setImageError] = useState(false);

    const handleClick = useCallback(() => goToActorsAbout(actor), [goToActorsAbout, actor]);
    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                goToActorsAbout(actor);
            }
        },
        [goToActorsAbout, actor]
    );

    const imageSrc =
        actor.profile_path && !imageError
            ? `https://image.tmdb.org/t/p/w154/${actor.profile_path}`
            : PLACEHOLDER_IMAGE;

    return (
        <article
            className={`item ${style} col-sm-6 my-2 card card-body`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-label={displayName}
        >
            <div className="text-center position-relative mb-2">
                <div className="captionLayer overflow-hidden mb-2">
                    <img
                        src={imageSrc}
                        alt={`${displayName} photo`}
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
            </div>
        </article>
    );
});

Actor.displayName = "Actor";

export default Actor;
