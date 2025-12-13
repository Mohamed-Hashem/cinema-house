import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./index.scss";
import "./Scss/Fontfamily.css";
import "react-toastify/dist/ReactToastify.min.css";

import { store } from "./Redux/Store/Store.jsx";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,

    document.getElementById("root")
);
