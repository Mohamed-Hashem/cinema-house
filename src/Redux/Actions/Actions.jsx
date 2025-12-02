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

export const getTrending = (mediaType) => {
	const controller = new AbortController();

	return async (dispatch) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=0c46ad1eb5954840ed97f5e537764be8`,
				{ signal: controller.signal }
			)
			.then((res) => {
				const { results } = res.data;

				if (mediaType === "movie")
					dispatch({ type: GET_MOVIES_TRENDING, payload: results });
				else if (mediaType === "person")
					dispatch({ type: GET_ACTORS_TRENDING, payload: results });
				else dispatch({ type: GET_SERIES_TRENDING, payload: results });
			})
			.catch((error) => {
				console.log("error = ", error);
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
				`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=0c46ad1eb5954840ed97f5e537764be8&page=${page}`,
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
				console.log("error = ", error);
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
				`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=0c46ad1eb5954840ed97f5e537764be8&append_to_response=all`,
				{ signal: controller.signal }
			)
			.then((res) => {
				const { data } = res;
				dispatch({ type: MEDIA_TYPE_DETAILS, payload: data });
			})
			.catch((error) => {
				console.log("error = ", error);
				dispatch({ type: MEDIA_TYPE_DETAILS, payload: [] });
			});
	};
};

export const getMediaType_Iframe = (id, mediaType) => {
	const controller = new AbortController();

	return async (dispatch) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=0c46ad1eb5954840ed97f5e537764be8`,
				{ signal: controller.signal }
			)
			.then((res) => {
				let { data } = res;

				if (data.results[0].key) data = data.results[0].key;
				else data = data.results[0];

				dispatch({ type: MEDIA_TYPE_IFRAME, payload: data });
			})
			.catch((error) => {
				console.log("error = ", error);
				dispatch({ type: MEDIA_TYPE_IFRAME, payload: [] });
			});
	};
};

export const fetchPosters = (mediaType, id, dataType) => {
	const controller = new AbortController();

	return async (dispatch, getState) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/${mediaType}/${id}/${dataType}?api_key=0c46ad1eb5954840ed97f5e537764be8`,
				{ signal: controller.signal }
			)
			.then((res) => {
				const { backdrops } = res.data;

				if (backdrops.length > 0)
					dispatch({ type: FETCH_MOVIE_POSTERS, payload: backdrops });
				else dispatch({ type: FETCH_MOVIE_POSTERS, payload: [] });
			})
			.catch((error) => {
				console.log("error = ", error);
				dispatch({ type: FETCH_MOVIE_POSTERS, payload: [] });
			});
	};
};

export const fetchActors = (mediaType, id, dataType) => {
	const controller = new AbortController();

	return async (dispatch, getState) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/${mediaType}/${id}/${dataType}?api_key=0c46ad1eb5954840ed97f5e537764be8`,
				{ signal: controller.signal }
			)
			.then((res) => {
				const { cast } = res.data;

				if (cast.length > 0)
					dispatch({ type: FETCH_MOVIE_ACTORS, payload: cast });
				else dispatch({ type: FETCH_MOVIE_ACTORS, payload: [] });
			})
			.catch((error) => {
				console.log("error = ", error);
				dispatch({ type: FETCH_MOVIE_ACTORS, payload: [] });
			});
	};
};

export const fetchSimilar = (mediaType, id, dataType) => {
	const controller = new AbortController();

	return async (dispatch, getState) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/${mediaType}/${id}/${dataType}?api_key=0c46ad1eb5954840ed97f5e537764be8`,
				{ signal: controller.signal }
			)
			.then((res) => {
				const { results } = res.data;

				if (results.length > 0)
					dispatch({ type: FETCH_MOVIE_SIMILAR, payload: results });
				else dispatch({ type: FETCH_MOVIE_SIMILAR, payload: [] });
			})
			.catch((error) => {
				console.log("error = ", error);
				dispatch({ type: FETCH_MOVIE_SIMILAR, payload: [] });
			});
	};
};

export const fetchRecommendations = (mediaType, id, dataType) => {
	const controller = new AbortController();

	return async (dispatch, getState) => {
		await axios
			.get(
				`https://api.themoviedb.org/3/${mediaType}/${id}/${dataType}?api_key=0c46ad1eb5954840ed97f5e537764be8`,
				{ signal: controller.signal }
			)
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
				console.log("error = ", error);
				dispatch({ type: FETCH_MOVIE_RECOMMENDATIONS, payload: [] });
			});
	};
};

export const formData = (User, status) => {
	return async (dispatch, getState) => {
		const controller = new AbortController();

		await axios
			.post(`https://route-egypt-api.herokuapp.com/${status}`, User, {
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
				console.log("error = ", error);

				dispatch({ type: REGISTER, payload: "Network Error" });
				dispatch({ type: LOGIN, payload: "Network Error" });
			});
	};
};
