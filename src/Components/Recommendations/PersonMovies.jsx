import React, { useEffect, useState, useRef, useCallback } from "react";
import AliceCarousel from "react-alice-carousel";
import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const PersonMovies = ({ movie, goToMovieAbout }) => {
    const [credits, setCredits] = useState(null);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    const fetchImages = useCallback(async (movieId) => {
        if (!movieId) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/person/${movieId}/movie_credits?api_key=${TMDB_API_KEY}`
            );
            if (isMountedRef.current && res.data.cast.length > 0) {
                setLoading(true);
                setCredits(res.data.cast);
            }
        } catch (err) {
            console.error("Error fetching person movies:", err);
            if (isMountedRef.current) {
                setCredits([]);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        fetchImages(movie?.id);

        return () => {
            isMountedRef.current = false;
        };
    }, [movie?.id, fetchImages]);

    // Return null if movie is not defined
    if (!movie?.id) return null;

    const items = React.Children.toArray(
        credits?.map((poster) => {
            return poster.poster_path ? (
                <div className="item card card-body" onClick={() => goToMovieAbout(poster)}>
                    <div className="text-center position-relative">
                        <div className="captionLayer overflow-hidden mb-2  carouselItem">
                            <img
                                src={`https://image.tmdb.org/t/p/original${poster.poster_path}`}
                                width="100%"
                                height="350"
                                alt={poster.name ? poster.name : poster.title}
                                title={poster.name ? poster.name : poster.title}
                                className="carouselItem__img"
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

    return loading && credits?.length > 0 ? (
        <>
            <div className="w-100 line my-5"></div>

            <div className="item text-center my-3">
                <h3>
                    <b className="text-info "> {movie.name} </b> and The Movies Who Take Part
                    in{" "}
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

export default PersonMovies;
