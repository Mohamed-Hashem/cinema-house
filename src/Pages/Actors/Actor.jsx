import React, { memo, useCallback } from "react";

const PLACEHOLDER_IMAGE = "https://via.placeholder.com/468x700/1E2D55?Text=No+Image";

const Actor = memo(({ actor, goToActorsAbout, height = "250" }) => {
    const style = height === "350" ? "col-xl-3 col-lg-4 col-md-6" : "col-xl-2 col-lg-3 col-md-4";

    const handleClick = useCallback(() => goToActorsAbout(actor), [goToActorsAbout, actor]);

    const imageSrc = actor.profile_path
        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
        : PLACEHOLDER_IMAGE;

    return (
        <div className={`item ${style} col-sm-6 my-2 card card-body`} onClick={handleClick}>
            <div className="text-center position-relative mb-2">
                <div className="captionLayer overflow-hidden mb-2">
                    <img
                        src={imageSrc}
                        width="100%"
                        height={height}
                        alt={actor.name || actor.title}
                        title={actor.name || actor.title}
                        loading="lazy"
                    />
                    <div className="item-layer position-absolute w-100 h-100"></div>
                </div>

                <b>{actor.name || actor.title}</b>
            </div>
        </div>
    );
});

Actor.displayName = "Actor";

export default Actor;
