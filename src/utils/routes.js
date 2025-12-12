export const ROUTES = {
    HOME: "/home",
    LOGIN: "/login",
    REGISTER: "/register",
    LOGOUT: "/logout",
    PROFILE: "/profile",
    MOVIES: "/movies",
    SERIES: "/series",
    ACTORS: "/actors",
    SEARCH: "/search",
    MOVIE_DETAIL: "/movies/:id",
    SERIES_DETAIL: "/series/:id",
    ACTOR_DETAIL: "/actors/:id",
    SEASON_DETAIL: "/series/:seriesId/season/:seasonNumber",
    EPISODE_DETAIL: "/series/:seriesId/season/:seasonNumber/episode/:episodeNumber",
};

export const generatePath = {
    movie: (id) => `/movies/${id}`,
    series: (id) => `/series/${id}`,
    actor: (id) => `/actors/${id}`,
    season: (seriesId, seasonNumber) => `/series/${seriesId}/season/${seasonNumber}`,
    episode: (seriesId, seasonNumber, episodeNumber) =>
        `/series/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
    search: (query) => (query ? `/search?q=${encodeURIComponent(query)}` : "/search"),
};

export const parseParams = {
    getSeriesId: (match) => match?.params?.seriesId || match?.params?.id,
    getSeasonNumber: (match) => match?.params?.seasonNumber,
    getEpisodeNumber: (match) => match?.params?.episodeNumber,
    getId: (match) => match?.params?.id,
};

export const isDetailRoute = (pathname) =>
    pathname.includes("/movies/") || pathname.includes("/series/") || pathname.includes("/actors/");

export const isAuthRoute = (pathname) => pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER;

export default ROUTES;
