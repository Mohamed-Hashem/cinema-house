import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { getPosterUrl } from "../../utils/imageUtils";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const Seasons = ({ Season, goToSeason }) => {
    const [season, setSeason] = useState([]);
    const [loading, setLoading] = useState(false);
    const isMountedRef = useRef(true);

    const fetchSessions = useCallback(async (id) => {
        if (!id) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=all`
            );
            if (isMountedRef.current && res.data.seasons.length > 0) {
                setSeason(res.data.seasons);
                setLoading(true);
            }
        } catch (err) {
            console.error("Error fetching seasons:", err);
            if (isMountedRef.current) {
                setSeason([]);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        fetchSessions(Season?.id);

        return () => {
            isMountedRef.current = false;
        };
    }, [Season?.id, fetchSessions]);

    if (!Season?.id) return null;

    return loading ? (
        <>
            <div className="row">
                <div className="w-100 line my-5"></div>
                <div className="col-md-12">
                    <div className=" text-center my-3">
                        <h3>The Seasons Of {Season.name ? Season.name : Season.title}</h3>
                    </div>
                </div>
                {React.Children.toArray(
                    season.map((season) => {
                        return (
                            <div
                                className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
                                onClick={() => goToSeason(season)}
                            >
                                <div className="text-center position-relative mb-2">
                                    <div className="captionLayer overflow-hidden mb-2">
                                        <img
                                            src={`${
                                                season.poster_path
                                                    ? getPosterUrl(season.poster_path)
                                                    : `https://via.placeholder.com/154x231/1e2d55/fff?text=${season.name}`
                                            } `}
                                            width="154"
                                            height="231"
                                            loading="lazy"
                                            decoding="async"
                                            alt={season.name}
                                            onDragStart={handleDragStart}
                                        />
                                        <div className="item-layer position-absolute w-100 h-100"></div>
                                    </div>
                                    <span className={`${season.episode_count} vote vote1`}>
                                        {season.episode_count} e
                                    </span>
                                    <b>{season.name}</b>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </>
    ) : null;
};

export default Seasons;
