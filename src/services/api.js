import axios from "axios";

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_URL;

export const tmdbApi = axios.create({
    baseURL: TMDB_BASE_URL,
    params: { api_key: TMDB_API_KEY },
});

export const backendApi = axios.create({
    baseURL: BACKEND_BASE_URL,
});

backendApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

backendApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export const tmdbService = {
    getTrending: (mediaType, timeWindow = "week", signal) =>
        tmdbApi.get(`/trending/${mediaType}/${timeWindow}`, { signal }),

    getPopular: (mediaType, page = 1, signal) =>
        tmdbApi.get(mediaType === "tv" ? "/tv/popular" : `/${mediaType}/popular`, {
            params: { page },
            signal,
        }),

    getMediaDetails: (mediaType, id, signal) =>
        tmdbApi.get(`/${mediaType}/${id}`, {
            params: { append_to_response: "videos,credits,similar,recommendations,images" },
            signal,
        }),

    getVideos: (mediaType, id, signal) => tmdbApi.get(`/${mediaType}/${id}/videos`, { signal }),

    getImages: (mediaType, id, signal) => tmdbApi.get(`/${mediaType}/${id}/images`, { signal }),

    getCredits: (mediaType, id, signal) => tmdbApi.get(`/${mediaType}/${id}/credits`, { signal }),

    getSimilar: (mediaType, id, signal) => tmdbApi.get(`/${mediaType}/${id}/similar`, { signal }),

    getRecommendations: (mediaType, id, signal) =>
        tmdbApi.get(`/${mediaType}/${id}/recommendations`, { signal }),

    searchMulti: (query, page = 1, signal) =>
        tmdbApi.get("/search/multi", { params: { query, page, include_adult: false }, signal }),

    getPersonDetails: (id, signal) =>
        tmdbApi.get(`/person/${id}`, {
            params: { append_to_response: "movie_credits,tv_credits,images" },
            signal,
        }),

    getSeriesSeasonDetails: (seriesId, seasonNumber, signal) =>
        tmdbApi.get(`/tv/${seriesId}/season/${seasonNumber}`, { signal }),

    getSeriesEpisodeDetails: (seriesId, seasonNumber, episodeNumber, signal) =>
        tmdbApi.get(`/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`, { signal }),
};

export const authService = {
    register: (userData) => backendApi.post("/api/auth/register", userData),
    login: (credentials) => backendApi.post("/api/auth/login", credentials),
    verifyToken: () => backendApi.get("/api/auth/verify"),
    getProfile: () => backendApi.get("/api/profile"),
};

export const dataService = {
    getUserData: () => backendApi.get("/api/data"),
    updateProfile: (profileData) => backendApi.put("/api/profile", profileData),
    getUserStats: () => backendApi.get("/api/stats"),
    changePassword: (passwordData) => backendApi.put("/api/change-password", passwordData),
};

export default { tmdbService, authService, dataService };
