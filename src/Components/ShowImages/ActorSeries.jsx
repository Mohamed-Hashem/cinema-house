import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";
import { getPosterUrl } from "../../utils/imageUtils";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const ActorSeries = ({ series, goToSeriesAbout }) => {
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    const fetchImages = useCallback(async (seriesId) => {
        if (!seriesId) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/person/${seriesId}/tv_credits?api_key=${TMDB_API_KEY}`
            );
            if (isMountedRef.current && res.data.cast.length > 0) {
                setLoading(true);
                setCredits(res.data.cast);
            }
        } catch (err) {
            console.error("Error fetching actor TV credits:", err);
            if (isMountedRef.current) {
                setCredits([]);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        fetchImages(series?.id);

        return () => {
            isMountedRef.current = false;
        };
    }, [series?.id, fetchImages]);

    const items = useMemo(
        () =>
            credits?.map((poster) =>
                poster.poster_path ? (
                    <div className="item card card-body" onClick={() => goToSeriesAbout(poster)}>
                        <div className="text-center position-relative">
                            <div className="captionLayer overflow-hidden mb-2  carouselItem">
                                <img
                                    src={getPosterUrl(poster.poster_path)}
                                    width="140"
                                    height="210"
                                    loading="lazy"
                                    decoding="async"
                                    className="carouselItem__img"
                                    alt={series?.name || series?.title || "Actor"}
                                    onDragStart={handleDragStart}
                                />
                                <div className="item-layer position-absolute w-100 h-100"></div>
                            </div>
                            <span
                                className={`${poster.vote_average >= 7 ? "vote vote1" : "vote vote2"}`}
                            >
                                {poster.poster_path !== null
                                    ? Number(poster.vote_average).toFixed(1)
                                    : ""}
                            </span>
                            <b>
                                {poster.title} {poster.name}
                            </b>
                        </div>
                    </div>
                ) : null
            ) ?? [],
        [credits, series?.name, series?.title, goToSeriesAbout]
    );

    if (!series?.id || !loading || !items.length) return null;

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

    return loading && credits?.length > 0 ? (
        <>
            <div className="w-100 line my-5"></div>

            <div className="item  text-center my-3">
                <h3>
                    <b className="text-info "> {series?.name || series?.title} </b> and The Series
                    Who Take Part in{" "}
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

export default ActorSeries;
