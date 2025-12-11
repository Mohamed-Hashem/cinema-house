import {
    FETCH_MOVIE_ACTORS,
    FETCH_MOVIE_POSTERS,
    GET_ACTORS_TRENDING,
    GET_MOVIES_TRENDING,
    GET_SERIES_TRENDING,
    LOGIN,
    MEDIA_TYPE_DETAILS,
    MEDIA_TYPE_IFRAME,
    FETCH_MOVIE_SIMILAR,
    REGISTER,
    FETCH_MOVIE_RECOMMENDATIONS,
} from "./Types";

import axios from "axios";

// Environment variables for TMDB API
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export const getTrending = (mediaType) => {
    const controller = new AbortController();

    return async (dispatch) => {
        await axios
            .get(`${TMDB_BASE_URL}/trending/${mediaType}/week?api_key=${TMDB_API_KEY}`, {
                signal: controller.signal,
            })
            .then((res) => {
                const { results } = res.data;

                if (mediaType === "movie")
                    dispatch({ type: GET_MOVIES_TRENDING, payload: results });
                else if (mediaType === "person")
                    dispatch({ type: GET_ACTORS_TRENDING, payload: results });
                else dispatch({ type: GET_SERIES_TRENDING, payload: results });
            })
            .catch((error) => {
                console.error("Error fetching trending data:", error);
                dispatch({ type: GET_MOVIES_TRENDING, payload: [] });
                dispatch({ type: GET_SERIES_TRENDING, payload: [] });
                dispatch({ type: GET_ACTORS_TRENDING, payload: [] });
            });
    };
};

export const getAllData = (page, mediaType) => {
    return async (dispatch, getState) => {
        const { movies, actors, series } = getState();

        const controller = new AbortController();

        await axios
            .get(
                `${TMDB_BASE_URL}/trending/${mediaType}/day?api_key=${TMDB_API_KEY}&page=${page}`,
                { signal: controller.signal }
            )
            .then((res) => {
                let { results } = res.data;

                if (mediaType === "movie") {
                    let data = [...movies, ...results];

                    dispatch({ type: GET_MOVIES_TRENDING, payload: data });
                    dispatch({ type: GET_ACTORS_TRENDING, payload: [] });
                    dispatch({ type: GET_SERIES_TRENDING, payload: [] });
                } else if (mediaType === "person") {
                    let data = [...actors, ...results];

                    dispatch({ type: GET_ACTORS_TRENDING, payload: data });
                    dispatch({ type: GET_MOVIES_TRENDING, payload: [] });
                    dispatch({ type: GET_SERIES_TRENDING, payload: [] });
                } else if (mediaType === "tv") {
                    let data = [...series, ...results];

                    dispatch({ type: GET_SERIES_TRENDING, payload: data });
                    dispatch({ type: GET_MOVIES_TRENDING, payload: [] });
                    dispatch({ type: GET_ACTORS_TRENDING, payload: [] });
                }
            })
            .catch((error) => {
                console.error("Error fetching paginated data:", error);
                dispatch({ type: GET_MOVIES_TRENDING, payload: [] });
                dispatch({ type: GET_ACTORS_TRENDING, payload: [] });
                dispatch({ type: GET_SERIES_TRENDING, payload: [] });
            });
    };
};

export const getMediaType_Data = (id, mediaType) => {
    const controller = new AbortController();

    return async (dispatch) => {
        await axios
            .get(
                `${TMDB_BASE_URL}/${mediaType}/${id}?api_key=${TMDB_API_KEY}&append_to_response=all`,
                { signal: controller.signal }
            )
            .then((res) => {
                const { data } = res;
                dispatch({ type: MEDIA_TYPE_DETAILS, payload: data });
            })
            .catch((error) => {
                console.error("Error fetching media details:", error);
                dispatch({ type: MEDIA_TYPE_DETAILS, payload: [] });
            });
    };
};

export const getMediaType_Iframe = (id, mediaType) => {
    const controller = new AbortController();

    return async (dispatch) => {
        await axios
            .get(`${TMDB_BASE_URL}/${mediaType}/${id}/videos?api_key=${TMDB_API_KEY}`, {
                signal: controller.signal,
            })
            .then((res) => {
                let { data } = res;

                // Safely check if results array has items
                if (data.results && data.results.length > 0 && data.results[0]?.key) {
                    data = data.results[0].key;
                } else {
                    data = null;
                }

                dispatch({ type: MEDIA_TYPE_IFRAME, payload: data });
            })
            .catch((error) => {
                console.error("Error fetching video data:", error);
                dispatch({ type: MEDIA_TYPE_IFRAME, payload: null });
            });
    };
};

export const fetchPosters = (mediaType, id, dataType) => {
    const controller = new AbortController();

    return async (dispatch) => {
        await axios
            .get(`${TMDB_BASE_URL}/${mediaType}/${id}/${dataType}?api_key=${TMDB_API_KEY}`, {
                signal: controller.signal,
            })
            .then((res) => {
                const { backdrops } = res.data;

                if (backdrops.length > 0)
                    dispatch({ type: FETCH_MOVIE_POSTERS, payload: backdrops });
                else dispatch({ type: FETCH_MOVIE_POSTERS, payload: [] });
            })
            .catch((error) => {
                console.error("Error fetching posters:", error);
                dispatch({ type: FETCH_MOVIE_POSTERS, payload: [] });
            });
    };
};

export const fetchActors = (mediaType, id, dataType) => {
    const controller = new AbortController();

    return async (dispatch) => {
        await axios
            .get(`${TMDB_BASE_URL}/${mediaType}/${id}/${dataType}?api_key=${TMDB_API_KEY}`, {
                signal: controller.signal,
            })
            .then((res) => {
                const { cast } = res.data;

                if (cast.length > 0) dispatch({ type: FETCH_MOVIE_ACTORS, payload: cast });
                else dispatch({ type: FETCH_MOVIE_ACTORS, payload: [] });
            })
            .catch((error) => {
                console.error("Error fetching actors:", error);
                dispatch({ type: FETCH_MOVIE_ACTORS, payload: [] });
            });
    };
};

export const fetchSimilar = (mediaType, id, dataType) => {
    const controller = new AbortController();

    return async (dispatch) => {
        await axios
            .get(`${TMDB_BASE_URL}/${mediaType}/${id}/${dataType}?api_key=${TMDB_API_KEY}`, {
                signal: controller.signal,
            })
            .then((res) => {
                const { results } = res.data;

                if (results.length > 0) dispatch({ type: FETCH_MOVIE_SIMILAR, payload: results });
                else dispatch({ type: FETCH_MOVIE_SIMILAR, payload: [] });
            })
            .catch((error) => {
                console.error("Error fetching similar items:", error);
                dispatch({ type: FETCH_MOVIE_SIMILAR, payload: [] });
            });
    };
};

export const fetchRecommendations = (mediaType, id, dataType) => {
    const controller = new AbortController();

    return async (dispatch) => {
        await axios
            .get(`${TMDB_BASE_URL}/${mediaType}/${id}/${dataType}?api_key=${TMDB_API_KEY}`, {
                signal: controller.signal,
            })
            .then((res) => {
                const { results } = res.data;

                if (results.length > 0)
                    dispatch({
                        type: FETCH_MOVIE_RECOMMENDATIONS,
                        payload: results,
                    });
                else
                    dispatch({
                        type: FETCH_MOVIE_RECOMMENDATIONS,
                        payload: [],
                    });
            })
            .catch((error) => {
                console.error("Error fetching recommendations:", error);
                dispatch({ type: FETCH_MOVIE_RECOMMENDATIONS, payload: [] });
            });
    };
};

export const formData = (User, status) => {
    return async (dispatch) => {
        const controller = new AbortController();

        // Map status to endpoint
        const endpoint = status === "signup" ? "register" : "login";

        await axios
            .post(`http://localhost:5000/api/auth/${endpoint}`, User, {
                signal: controller.signal,
            })
            .then((res) => {
                if (status === "signup") {
                    const { message } = res.data;
                    dispatch({ type: REGISTER, payload: message });
                } else {
                    const { data } = res;
                    dispatch({ type: LOGIN, payload: data });
                }
            })
            .catch((error) => {
                console.error("Authentication error:", error);

                dispatch({ type: REGISTER, payload: "Network Error" });
                dispatch({ type: LOGIN, payload: "Network Error" });
            });
    };
};
