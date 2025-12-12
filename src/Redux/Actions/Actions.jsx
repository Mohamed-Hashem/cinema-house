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

import { tmdbService, authService } from "../../services/api";

export const getTrending = (mediaType) => {
    return async (dispatch) => {
        try {
            const response = await tmdbService.getTrending(mediaType);
            const { results } = response.data;

            if (mediaType === "movie") dispatch({ type: GET_MOVIES_TRENDING, payload: results });
            else if (mediaType === "person")
                dispatch({ type: GET_ACTORS_TRENDING, payload: results });
            else dispatch({ type: GET_SERIES_TRENDING, payload: results });
        } catch (error) {
            console.error("Error fetching trending data:", error);
            dispatch({ type: GET_MOVIES_TRENDING, payload: [] });
            dispatch({ type: GET_SERIES_TRENDING, payload: [] });
            dispatch({ type: GET_ACTORS_TRENDING, payload: [] });
        }
    };
};

export const getAllData = (page, mediaType) => {
    return async (dispatch, getState) => {
        const { movies, actors, series } = getState();

        try {
            const response = await tmdbService.getPopular(mediaType, page);
            let { results } = response.data;

            if (mediaType === "movie") {
                const combinedData = [...movies, ...results];
                const uniqueData = Array.from(
                    new Map(combinedData.map((item) => [item.id, item])).values()
                );

                dispatch({ type: GET_MOVIES_TRENDING, payload: uniqueData });
            } else if (mediaType === "person") {
                const combinedData = [...actors, ...results];
                const uniqueData = Array.from(
                    new Map(combinedData.map((item) => [item.id, item])).values()
                );

                dispatch({ type: GET_ACTORS_TRENDING, payload: uniqueData });
            } else if (mediaType === "tv") {
                const combinedData = [...series, ...results];
                const uniqueData = Array.from(
                    new Map(combinedData.map((item) => [item.id, item])).values()
                );

                dispatch({ type: GET_SERIES_TRENDING, payload: uniqueData });
            }
        } catch (error) {
            console.error("Error fetching paginated data:", error);
        }
    };
};

export const getMediaType_Data = (id, mediaType) => {
    return async (dispatch) => {
        try {
            const response = await tmdbService.getMediaDetails(mediaType, id);
            const { data } = response;
            dispatch({ type: MEDIA_TYPE_DETAILS, payload: data });
        } catch (error) {
            console.error("Error fetching media details:", error);
            dispatch({ type: MEDIA_TYPE_DETAILS, payload: [] });
        }
    };
};

export const getMediaType_Iframe = (id, mediaType) => {
    return async (dispatch) => {
        try {
            const response = await tmdbService.getVideos(mediaType, id);
            let { data } = response;

            if (data.results && data.results.length > 0 && data.results[0]?.key) {
                data = data.results[0].key;
            } else {
                data = null;
            }

            dispatch({ type: MEDIA_TYPE_IFRAME, payload: data });
        } catch (error) {
            console.error("Error fetching video data:", error);
            dispatch({ type: MEDIA_TYPE_IFRAME, payload: null });
        }
    };
};

export const fetchPosters = (mediaType, id, _dataType) => {
    return async (dispatch) => {
        try {
            const response = await tmdbService.getImages(mediaType, id);
            const { backdrops } = response.data;

            if (backdrops.length > 0) dispatch({ type: FETCH_MOVIE_POSTERS, payload: backdrops });
            else dispatch({ type: FETCH_MOVIE_POSTERS, payload: [] });
        } catch (error) {
            console.error("Error fetching posters:", error);
            dispatch({ type: FETCH_MOVIE_POSTERS, payload: [] });
        }
    };
};

export const fetchActors = (mediaType, id, _dataType) => {
    return async (dispatch) => {
        try {
            const response = await tmdbService.getCredits(mediaType, id);
            const { cast } = response.data;

            if (cast.length > 0) dispatch({ type: FETCH_MOVIE_ACTORS, payload: cast });
            else dispatch({ type: FETCH_MOVIE_ACTORS, payload: [] });
        } catch (error) {
            console.error("Error fetching actors:", error);
            dispatch({ type: FETCH_MOVIE_ACTORS, payload: [] });
        }
    };
};

export const fetchSimilar = (mediaType, id, _dataType) => {
    return async (dispatch) => {
        try {
            const response = await tmdbService.getSimilar(mediaType, id);
            const { results } = response.data;

            if (results.length > 0) dispatch({ type: FETCH_MOVIE_SIMILAR, payload: results });
            else dispatch({ type: FETCH_MOVIE_SIMILAR, payload: [] });
        } catch (error) {
            console.error("Error fetching similar items:", error);
            dispatch({ type: FETCH_MOVIE_SIMILAR, payload: [] });
        }
    };
};

export const fetchRecommendations = (mediaType, id, _dataType) => {
    return async (dispatch) => {
        try {
            const response = await tmdbService.getRecommendations(mediaType, id);
            const { results } = response.data;

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
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            dispatch({ type: FETCH_MOVIE_RECOMMENDATIONS, payload: [] });
        }
    };
};

export const formData = (User, status) => {
    return async (dispatch) => {
        try {
            if (status === "signup") {
                const response = await authService.register(User);
                const { message } = response.data;
                dispatch({ type: REGISTER, payload: message });
            } else {
                const response = await authService.login(User);
                dispatch({ type: LOGIN, payload: response.data });
            }
        } catch (error) {
            console.error("Authentication error:", error);
            const errorMessage = error.response?.data?.message || "Network Error";

            if (status === "signup") {
                dispatch({ type: REGISTER, payload: errorMessage });
            } else {
                dispatch({ type: LOGIN, payload: errorMessage });
            }
        }
    };
};
