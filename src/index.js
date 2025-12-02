//** import Bootstrap **//
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "jquery/dist/jquery.min.js";
import "popper.js/dist/umd/popper.min.js";
import React from "react";
import ReactDOM from "react-dom";

//** import Redux Provider **//
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

//** import App **//
import App from "./App.js";

//** import Scss Style and Css Styles **//
import "./index.scss";
import "./Scss/Fontfamily.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.min.css";

//** import Redux Store **//
import { store } from "./Redux/Store/Store.jsx";

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter basename="/#">
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,

	document.getElementById("root")
);
