import React, { useEffect, useState, useRef, useCallback } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const PersonShow = ({ poster }) => {
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    const fetchImages = useCallback(async (posterId) => {
        if (!posterId) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/person/${posterId}/images?api_key=${TMDB_API_KEY}`
            );
            if (isMountedRef.current && res.data.profiles.length > 0) {
                setLoading(true);
                setCredits(res.data.profiles);
            }
        } catch (err) {
            console.error("Error fetching person images:", err);
            if (isMountedRef.current) {
                setCredits([]);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        fetchImages(poster?.id);

        return () => {
            isMountedRef.current = false;
        };
    }, [poster?.id, fetchImages]);

    // Return null if poster is not defined
    if (!poster?.id) return null;

    const items = credits?.map((img) => {
        return img.file_path ? (
            <div className="itemHover card card-body">
                <div className="captionLayer overflow-hidden carouselItem">
                    <img
                        src={`https://image.tmdb.org/t/p/original${img.file_path}`}
                        className="carouselItem__img"
                        height="350"
                        alt={poster.name ? poster.name : poster.title}
                        onDragStart={handleDragStart}
                    />
                </div>
            </div>
        ) : null;
    });

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
            <div className="w-100 line my-5"></div>

            <div className="item  text-center my-3">
                <h3>Posters For {poster.name} </h3>
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

export default PersonShow;
