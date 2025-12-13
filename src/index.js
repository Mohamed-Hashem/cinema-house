import "bootstrap/dist/css/bootstrap.min.css";
import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import "./Scss/Fontfamily.css";
import "react-toastify/dist/ReactToastify.min.css";

import { store } from "./Redux/Store/Store.jsx";
import { LoadingSpinner } from "./Components/shared";

const App = lazy(() => import("./App.jsx"));

const InitialLoader = () => (
    <div
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            backgroundColor: "#141414",
        }}
    >
        <LoadingSpinner height={80} width={80} color="#e50914" />
    </div>
);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <Suspense fallback={<InitialLoader />}>
                    <App />
                </Suspense>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>,

    document.getElementById("root")
);
