import {
	FETCH_MOVIE_RECOMMENDATIONS,
	FETCH_MOVIE_SIMILAR,
	FETCH_MOVIE_ACTORS,
	FETCH_MOVIE_POSTERS,
	GET_ACTORS_TRENDING,
	GET_MOVIES_TRENDING,
	GET_SERIES_TRENDING,
	LOGIN,
	MEDIA_TYPE_DETAILS,
	MEDIA_TYPE_IFRAME,
	REGISTER,
} from "../Actions/Types";

export function reducer(prevState, { type, payload }) {
	switch (type) {
		case GET_MOVIES_TRENDING:
			return { ...prevState, movies: payload };
		case GET_SERIES_TRENDING:
			return { ...prevState, series: payload };
		case GET_ACTORS_TRENDING:
			return { ...prevState, actors: payload };
		case MEDIA_TYPE_DETAILS:
			return { ...prevState, mediaType_Details: payload };
		case MEDIA_TYPE_IFRAME:
			return { ...prevState, mediaType_Iframe: payload };
		case FETCH_MOVIE_POSTERS:
			return { ...prevState, posters: payload };
		case FETCH_MOVIE_ACTORS:
			return { ...prevState, credits: payload };
		case FETCH_MOVIE_SIMILAR:
			return { ...prevState, similar: payload };
		case FETCH_MOVIE_RECOMMENDATIONS:
			return { ...prevState, recommendations: payload };
		case REGISTER:
			return { ...prevState, errorMessage: payload };
		case LOGIN:
			return { ...prevState, LoginData: payload };
		default:
			return prevState;
	}
}
