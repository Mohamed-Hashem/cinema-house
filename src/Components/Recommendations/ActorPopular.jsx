import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { getProfileUrl } from "../../utils/imageUtils";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const ActorPopular = ({ actor, goToActorAbout }) => {
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    const fetchImages = useCallback(async () => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/person/popular?api_key=${TMDB_API_KEY}`
            );
            if (isMountedRef.current && res.data.results.length > 0) {
                setLoading(true);
                setCredits(res.data.results);
            }
        } catch (err) {
            console.error("Error fetching popular actors:", err);
            if (isMountedRef.current) {
                setCredits([]);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        if (actor) {
            fetchImages();
        }

        return () => {
            isMountedRef.current = false;
        };
    }, [actor, fetchImages]);

    const items = useMemo(
        () =>
            credits?.map((poster) =>
                poster.profile_path ? (
                    <div className="item card card-body" onClick={() => goToActorAbout(poster)}>
                        )
                        <div className="text-center position-relative">
                            <div className="captionLayer overflow-hidden mb-2  carouselItem">
                                <img
                                    src={getProfileUrl(poster.profile_path)}
                                    width="185"
                                    height="278"
                                    loading="lazy"
                                    decoding="async"
                                    className="carouselItem__img"
                                    alt={actor.name}
                                    onDragStart={handleDragStart}
                                />
                                <div className="item-layer position-absolute w-100 h-100"></div>
                            </div>
                            <b>
                                {poster.title} {poster.name}
                            </b>
                        </div>
                    </div>
                ) : null
            ) ?? [],
        [credits, actor?.name, goToActorAbout]
    );

    if (!actor || !loading || !items.length) return null;

    const responsive = {
        0: {
            items: 1,
        },
        512: {
            items: 3,
        },
        1024: {
            items: 5,
        },
    };

    return loading && credits.length > 0 ? (
        <>
            <div className="my-5">
                <div className="w-100 line my-5"></div>

                <div className="item  text-center my-3">
                    <h3>
                        <b className="text-info">{actor.name}</b> and Popular Actors and
                        Actress{" "}
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
            </div>
        </>
    ) : null;
};

export default ActorPopular;
