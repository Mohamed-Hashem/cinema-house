import React, { useEffect, useState, useMemo } from "react";
import AliceCarousel from "react-alice-carousel";
import { useDispatch, useSelector } from "react-redux";
import { fetchActors } from "./../../Redux/Actions/Actions";
import { getProfileUrl } from "../../utils/imageUtils";

const handleDragStart = (e) => e.preventDefault();

const MovieActors = ({ actor, goToActorAbout }) => {
    const dispatch = useDispatch();
    const credits = useSelector((state) => state.credits);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (actor?.id) {
            dispatch(fetchActors("movie", actor.id, "credits"));
            setLoading(true);
        }

        return () => {
            setLoading(false);
        };
    }, [actor?.id, dispatch]);

    const items = useMemo(
        () =>
            credits?.map((actor) =>
                actor.profile_path ? (
                    <div className="item card card-body mb-3">
                        <div
                            className="position-relative text-center"
                            onClick={() => goToActorAbout(actor)}
                        >
                            <div className="captionLayer overflow-hidden carouselItem mb-2">
                                <img
                                    src={getProfileUrl(actor.profile_path)}
                                    width="185"
                                    height="278"
                                    loading="lazy"
                                    decoding="async"
                                    className="carouselItem__img"
                                    alt={actor.title ? actor.title : actor.name}
                                    title={actor.title ? actor.title : actor.name}
                                    onDragStart={handleDragStart}
                                />
                                <div className="item-layer position-absolute w-100 h-100"></div>
                            </div>

                            <b>
                                {actor.title} {actor.name}
                            </b>
                        </div>
                    </div>
                ) : null
            ) ?? [],
        [credits, goToActorAbout]
    );

    if (!actor?.id || !loading || !items.length) return null;

    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 2,
        },
        1024: {
            items: 5,
        },
    };

    return loading && credits.length > 0 ? (
        <>
            <div className="w-100 line my-5"></div>

            <div className="item text-center my-3">
                <h3>
                    The Actors Who Take Part In{" "}
                    <b className="text-info">{actor.name ? actor.name : actor.title}</b>
                </h3>
            </div>

            <AliceCarousel
                autoPlay
                responsive={responsive}
                infinite
                autoPlayInterval={2000}
                disableDotsControls
                mouseTracking
                items={items}
            />
        </>
    ) : null;
};

export default MovieActors;
