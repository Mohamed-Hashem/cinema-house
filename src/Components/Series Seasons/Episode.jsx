import axios from "axios";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { LoadingSpinner } from "../shared";
import { getStillUrl } from "../../utils/imageUtils";
import { generatePath } from "../../utils/routes";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const handleDragStart = (e) => e.preventDefault();

const Episode = () => {
    const { seriesId, seasonNumber, episodeNumber } = useParams();
    const history = useHistory();
    const location = useLocation();
    const [episodeData, setEpisodeData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMountedRef = useRef(true);
    const isNavigatingRef = useRef(false);

    const goBackToSeason = useCallback(() => {
        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;

        history.push(generatePath.season(seriesId, seasonNumber));

        requestAnimationFrame(() => {
            isNavigatingRef.current = false;
        });
    }, [seriesId, seasonNumber, history]);

    useEffect(() => {
        isMountedRef.current = true;
        setIsLoading(true);
        setError(null);

        if (location.state?.episode_number) {
            setEpisodeData(location.state);
            setIsLoading(false);
        } else if (seriesId && seasonNumber && episodeNumber) {
            const fetchEpisode = async () => {
                try {
                    const res = await axios.get(
                        `https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${TMDB_API_KEY}`
                    );
                    if (isMountedRef.current) {
                        setEpisodeData(res.data);
                        setIsLoading(false);
                    }
                } catch (err) {
                    console.error("Error fetching episode:", err);
                    if (isMountedRef.current) {
                        setError("Failed to load episode data");
                        setIsLoading(false);
                    }
                }
            };
            fetchEpisode();
        } else {
            setError("Missing episode information");
            setIsLoading(false);
        }

        return () => {
            isMountedRef.current = false;
        };
    }, [seriesId, seasonNumber, episodeNumber, location.state]);

    if (isLoading) {
        return (
            <section style={{ minHeight: "73vh" }}>
                <div
                    className="container about d-flex justify-content-center align-items-center"
                    style={{ minHeight: "50vh" }}
                >
                    <LoadingSpinner height={60} width={60} color="#8b99e0" />
                </div>
            </section>
        );
    }

    if (error || !episodeData) {
        return (
            <section style={{ minHeight: "73vh" }}>
                <div className="container about text-center" style={{ paddingTop: "100px" }}>
                    <h3 style={{ color: "#e50914" }}>Oops! Something went wrong</h3>
                    <p style={{ color: "#b3b3b3" }}>{error || "Episode not found"}</p>
                    <button
                        className="btn bg-purple mt-3"
                        onClick={goBackToSeason}
                        style={{ color: "#fff" }}
                    >
                        Back to Season
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
            <section style={{ minHeight: "73vh" }}>
                <div className="container about">
                    <div className="mb-3">
                        <button
                            className="btn btn-sm"
                            onClick={goBackToSeason}
                            style={{ color: "#8b99e0", border: "1px solid #8b99e0" }}
                        >
                            ← Back to Season {seasonNumber}
                        </button>
                    </div>
                    <div className="row  d-flex justify-content-start">
                        <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 my-2">
                            <div className="text-center position-relative mb-2">
                                <div className="mb-3">
                                    <img
                                        src={getStillUrl(episodeData.still_path)}
                                        width="300"
                                        height="169"
                                        decoding="async"
                                        alt={episodeData.name}
                                        title={episodeData.name}
                                        onDragStart={handleDragStart}
                                    />
                                </div>

                                <span
                                    className={`${
                                        episodeData.vote_average >= 7 ? "vote vote1" : "vote vote2"
                                    }`}
                                >
                                    {episodeData.still_path !== null
                                        ? Number(episodeData.vote_average).toFixed(1)
                                        : ""}
                                </span>
                                <b> Episode {episodeData.episode_number}</b>
                            </div>
                        </div>

                        <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th style={{ width: "200px" }}>Episode Number </th>
                                        <td> {episodeData.episode_number}</td>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <th>Episode Name</th>
                                        <td>{episodeData.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Air Date</th>
                                        <td>{episodeData.air_date || "Not available"}</td>
                                    </tr>
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <th>Overview</th>
                                        <td> {episodeData.overview || "No overview available"}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Episode;
