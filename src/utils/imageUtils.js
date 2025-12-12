const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const IMAGE_SIZES = {
    CAROUSEL_POSTER: "w154",
    CAROUSEL_PROFILE: "w185",
    DETAIL_POSTER: "w342",
    DETAIL_PROFILE: "w185",
    BACKDROP: "w780",
    BACKDROP_LARGE: "w1280",
    THUMBNAIL: "w154",
    STILL: "w300",
    GRID_PROFILE: "w185",
    PROFILE_LARGE: "h632",
};

export const getTMDBImageUrl = (path, size = IMAGE_SIZES.CAROUSEL_POSTER) => {
    if (!path) return null;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${TMDB_IMAGE_BASE}/${size}${cleanPath}`;
};

export const getPosterUrl = (path, isDetail = false) =>
    getTMDBImageUrl(path, isDetail ? IMAGE_SIZES.DETAIL_POSTER : IMAGE_SIZES.CAROUSEL_POSTER);

export const getProfileUrl = (path, isLarge = false) =>
    getTMDBImageUrl(path, isLarge ? IMAGE_SIZES.PROFILE_LARGE : IMAGE_SIZES.CAROUSEL_PROFILE);

export const getBackdropUrl = (path, isLarge = false) =>
    getTMDBImageUrl(path, isLarge ? IMAGE_SIZES.BACKDROP_LARGE : IMAGE_SIZES.BACKDROP);

export const getStillUrl = (path) => getTMDBImageUrl(path, IMAGE_SIZES.STILL);
