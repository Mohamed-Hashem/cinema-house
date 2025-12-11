import React, { useEffect, useState, useRef, useCallback } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const PersonPopular = ({ actor, goToPersonAbout }) => {
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
            console.error("Error fetching popular people:", err);
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

    // Return null if actor is not defined
    if (!actor) return null;

    const items = React.Children.toArray(
        credits?.map((poster) => {
            return poster.profile_path ? (
                <div className="item card card-body" onClick={() => goToPersonAbout(poster)}>
                    <div className="text-center position-relative">
                        <div className="captionLayer overflow-hidden mb-2  carouselItem">
                            <img
                                src={`https://image.tmdb.org/t/p/original${poster.profile_path}`}
                                width="100%"
                                height="350"
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
            ) : null;
        })
    );

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

export default PersonPopular;
