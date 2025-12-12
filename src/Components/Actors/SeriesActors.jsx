import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { getProfileUrl } from "../../utils/imageUtils";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const SeriesActors = ({ actors, goToActorAbout }) => {
    const [loading, setLoading] = useState(false);
    const [credits, setCredits] = useState([]);
    const isMountedRef = useRef(true);

    const fetchActors = useCallback(async (actorId) => {
        if (!actorId) return;
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/tv/${actorId}/aggregate_credits?api_key=${TMDB_API_KEY}`
            );
            if (isMountedRef.current) {
                setLoading(true);
                setCredits(response.data.cast);
            }
        } catch (error) {
            console.error("Error fetching series actors:", error);
            if (isMountedRef.current) {
                setCredits([]);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        fetchActors(actors?.id);

        return () => {
            isMountedRef.current = false;
        };
    }, [actors?.id, fetchActors]);

    const items = useMemo(
        () =>
            credits?.map((actor) =>
                actor.profile_path ? (
                    <div className="item card card-body" onClick={() => goToActorAbout(actor)}>
                        <div className="position-relative text-center">
                            <div className="captionLayer overflow-hidden carouselItem mb-2">
                                <img
                                    src={getProfileUrl(actor.profile_path)}
                                    width="185"
                                    height="278"
                                    loading="lazy"
                                    decoding="async"
                                    className="carouselItem__img"
                                    alt={actors.title ? actors.title : actors.name}
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
        [credits, actors, goToActorAbout]
    );

    if (!actors?.id || !loading || !items.length) return null;

    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 2,
        },
        1024: {
            items: 4,
        },
    };

    return loading && credits.length > 0 ? (
        <>
            <div className="w-100 line my-5"></div>

            <div className="item  text-center mx-auto my-3">
                <h3>
                    The Actors Who Take Part In{" "}
                    <b className="text-info">{actors.title ? actors.title : actors.name}</b>
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

export default SeriesActors;
