import axios from "axios";
import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { LoadingSpinner } from "../shared";
import { getPosterUrl, getStillUrl } from "../../utils/imageUtils";
import { generatePath } from "../../utils/routes";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const handleDragStart = (e) => e.preventDefault();

const SeasonData = () => {
    const { seriesId, seasonNumber } = useParams();
    const history = useHistory();
    const [episode, setEpisode] = useState([]);
    const [epsLoading, setEpsLoading] = useState(false);
    const [season, setSeason] = useState([]);
    const [seasonLoading, setSeasonLoading] = useState(false);
    const [seasonData, setSeasonData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMountedRef = useRef(true);
    const isNavigatingRef = useRef(false);

    const parsedSeriesId = useMemo(() => parseInt(seriesId, 10), [seriesId]);
    const parsedSeasonNumber = useMemo(() => parseInt(seasonNumber, 10), [seasonNumber]);

    const goToSeason = useCallback(
        (seasonItem) => {
            if (isNavigatingRef.current) return;
            isNavigatingRef.current = true;

            const path = generatePath.season(seriesId, seasonItem.season_number);
            history.push(path, { id: parsedSeriesId, season_number: seasonItem.season_number });

            requestAnimationFrame(() => {
                isNavigatingRef.current = false;
            });
        },
        [seriesId, parsedSeriesId, history]
    );

    const goToEpisode = useCallback(
        (episodeItem) => {
            if (isNavigatingRef.current) return;
            isNavigatingRef.current = true;

            const path = generatePath.episode(seriesId, seasonNumber, episodeItem.episode_number);
            history.push(path, {
                ...episodeItem,
                seriesId: parsedSeriesId,
                seasonNumber: parsedSeasonNumber,
            });

            requestAnimationFrame(() => {
                isNavigatingRef.current = false;
            });
        },
        [seriesId, seasonNumber, parsedSeriesId, parsedSeasonNumber, history]
    );

    const goBackToSeries = useCallback(() => {
        if (isNavigatingRef.current) return;
        isNavigatingRef.current = true;

        history.push(generatePath.series(seriesId));

        requestAnimationFrame(() => {
            isNavigatingRef.current = false;
        });
    }, [seriesId, history]);

    const fetchSessions = useCallback(async (id) => {
        if (!id) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=all`
            );
            if (isMountedRef.current && res.data.seasons?.length > 0) {
                setSeasonData(res.data);
                setSeasonLoading(true);
                setSeason(res.data.seasons);
            } else if (isMountedRef.current) {
                setSeason([]);
                setSeasonData(null);
            }
        } catch (err) {
            console.error("Error fetching seasons:", err);
            if (isMountedRef.current) {
                setSeason([]);
                setError("Failed to load series data");
            }
        }
    }, []);

    const fetchEpisodes = useCallback(async (id, seasonNum) => {
        if (!id || seasonNum === undefined) return;
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/tv/${id}/season/${seasonNum}?api_key=${TMDB_API_KEY}&append_to_response=all`
            );
            if (isMountedRef.current && res.data.episodes?.length > 0) {
                setEpisode(res.data.episodes);
                setEpsLoading(true);
            } else if (isMountedRef.current) {
                setEpisode([]);
            }
        } catch (err) {
            console.error("Error fetching episodes:", err);
            if (isMountedRef.current) {
                setEpisode([]);
            }
        } finally {
            if (isMountedRef.current) {
                setIsLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        isMountedRef.current = true;
        setIsLoading(true);
        setError(null);

        if (seriesId) {
            fetchSessions(seriesId);
            fetchEpisodes(seriesId, seasonNumber);
        } else {
            setIsLoading(false);
            setError("Missing series information. Please go back and try again.");
        }

        return () => {
            isMountedRef.current = false;
        };
    }, [seriesId, seasonNumber, fetchSessions, fetchEpisodes]);

    if (isLoading) {
        return (
            <section style={{ minHeight: "71vh" }}>
                <div
                    className="container about d-flex justify-content-center align-items-center"
                    style={{ minHeight: "50vh" }}
                >
                    <LoadingSpinner height={60} width={60} color="#8b99e0" />
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section style={{ minHeight: "71vh" }}>
                <div className="container about text-center" style={{ paddingTop: "100px" }}>
                    <h3 style={{ color: "#e50914" }}>Oops! Something went wrong</h3>
                    <p style={{ color: "#b3b3b3" }}>{error}</p>
                    <button
                        className="btn bg-purple mt-3"
                        onClick={goBackToSeries}
                        style={{ color: "#fff" }}
                    >
                        Back to Series
                    </button>
                </div>
            </section>
        );
    }

    return (
        <>
            <section style={{ minHeight: "71vh" }}>
                <div className="container about">
                    <div className="mb-3">
                        <button
                            className="btn btn-sm"
                            onClick={goBackToSeries}
                            style={{ color: "#8b99e0", border: "1px solid #8b99e0" }}
                        >
                            ← Back to Series
                        </button>
                    </div>
                    {seasonLoading && seasonData ? (
                        <div className="row  d-flex justify-content-start">
                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 my-2">
                                <div className="text-center position-relative mb-2">
                                    <div className="mb-3">
                                        <img
                                            src={`${
                                                seasonData.poster_path
                                                    ? getPosterUrl(seasonData.poster_path, true)
                                                    : `https://via.placeholder.com/245x380/1e2d55/fff?text=${seasonData.name}`
                                            } `}
                                            className="w-100 h-100"
                                            alt={
                                                seasonData.name === "undefined"
                                                    ? seasonData.name
                                                    : seasonData.name
                                            }
                                            name={
                                                seasonData.name === "undefined"
                                                    ? seasonData.name
                                                    : seasonData.name
                                            }
                                            onDragStart={handleDragStart}
                                        />
                                    </div>

                                    <span
                                        className={`${seasonData.vote_average >= 7 ? "vote vote1" : "vote vote2"}`}
                                    >
                                        {seasonData.poster_path !== null
                                            ? Number(seasonData.vote_average).toFixed(1)
                                            : ""}
                                    </span>
                                    <b>
                                        {seasonData.title} {seasonData.name}
                                    </b>
                                </div>
                            </div>

                            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 my-2 mx-auto">
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "200px" }}>Name </th>
                                            <td>
                                                {" "}
                                                {seasonData.title}
                                                {seasonData.name}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Season </th>
                                            <td> {seasonNumber}</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <th>Genres</th>
                                            <td>
                                                <span className="genres">
                                                    {seasonData.genres?.[0]?.name || "N/A"}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>First air date</th>
                                            <td>
                                                {" "}
                                                {seasonData.first_air_date != null
                                                    ? seasonData.first_air_date
                                                    : "Not Release"}
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Number of Episodes</th>
                                            <td> {seasonData.number_of_episodes}</td>
                                        </tr>
                                        <tr>
                                            <th>Number of Seasons</th>
                                            <td> {seasonData.number_of_seasons}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th>Overview</th>
                                            <td> {seasonData.overview}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                            {epsLoading ? (
                                <>
                                    <div className="w-100 line my-5"></div>
                                    <div className="item  text-center my-3 col-md-12">
                                        <h3>Episodes Of Season {seasonNumber} </h3>
                                    </div>
                                    {React.Children.toArray(
                                        episode.map((eps) => {
                                            return (
                                                <div
                                                    className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
                                                    onClick={() => goToEpisode(eps)}
                                                >
                                                    <div className="text-center position-relative">
                                                        <div className="captionLayer overflow-hidden mb-2">
                                                            <img
                                                                src={`${
                                                                    eps.still_path
                                                                        ? getStillUrl(
                                                                              eps.still_path
                                                                          )
                                                                        : `https://via.placeholder.com/300x169/1e2d55/fff?text=${eps.episode_number}`
                                                                } `}
                                                                width="300"
                                                                height="169"
                                                                loading="lazy"
                                                                decoding="async"
                                                                alt={
                                                                    eps.name === "undefined"
                                                                        ? eps.name
                                                                        : eps.name
                                                                }
                                                                name={
                                                                    eps.name === "undefined"
                                                                        ? eps.name
                                                                        : eps.name
                                                                }
                                                                onDragStart={handleDragStart}
                                                            />
                                                            <div className="item-layer position-absolute w-100 h-100"></div>
                                                        </div>
                                                        <span
                                                            className={`${eps.vote_average >= 7 ? "vote vote1" : "vote vote2"}`}
                                                        >
                                                            {Number(eps.vote_average).toFixed(1)}
                                                        </span>
                                                        <b>Episode {eps.episode_number}</b>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </>
                            ) : null}

                            {seasonLoading ? (
                                <div className="row">
                                    <div className="w-100 line my-5"></div>
                                    <div className="col-md-12">
                                        <div className=" text-center my-3">
                                            <h3>The Seasons Of This Tv Serries</h3>
                                        </div>
                                    </div>
                                    {React.Children.toArray(
                                        season.map((ss) => {
                                            return (
                                                <div
                                                    className="item col-xl-3 col-lg-4 col-md-6 col-sm-6 my-2 card card-body"
                                                    onClick={() => goToSeason(ss)}
                                                >
                                                    <div className="text-center position-relative mb-2">
                                                        <div className="captionLayer overflow-hidden mb-2">
                                                            <img
                                                                src={`${
                                                                    ss.poster_path
                                                                        ? getPosterUrl(
                                                                              ss.poster_path
                                                                          )
                                                                        : `https://via.placeholder.com/154x231/1e2d55/fff?text=${ss.name}`
                                                                } `}
                                                                width="154"
                                                                height="231"
                                                                loading="lazy"
                                                                decoding="async"
                                                                alt={
                                                                    ss.name === "undefined"
                                                                        ? ss.name
                                                                        : ss.name
                                                                }
                                                                name={
                                                                    ss.name === "undefined"
                                                                        ? ss.name
                                                                        : ss.name
                                                                }
                                                                onDragStart={handleDragStart}
                                                            />
                                                            <div className="item-layer position-absolute w-100 h-100"></div>
                                                        </div>
                                                        <span
                                                            className={`${ss.episode_count} vote vote1`}
                                                        >
                                                            {ss.episode_count} e
                                                        </span>
                                                        <b>{ss.name}</b>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )}
                                </div>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </section>
        </>
    );
};

export default SeasonData;
