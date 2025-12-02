import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { reducer } from "../Reducer/Reducer";

const initialState = {
	movies: [],
	series: [],
	actors: [],
	movieDetails: [],
	seriesDetails: [],
	actorDetails: [],
	mediaType_Details: [],
	mediaType_Iframe: [],
	errorMessage: "",
	LoginData: {},
	posters: [],
	credits: [],
	similar: [],
	recommendations: [],
};

export const store = createStore(reducer, initialState, applyMiddleware(thunk));
