import React, { Component, Suspense, lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// Non-lazy imports for components needed immediately
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import SolidNavbar from "./Components/Solid Navbar/SolidNavbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./Components/ProtecedRoute/ProtectedRoute";
import CheckToken from "./Components/CheckToken/CheckToken";
import { LoadingSpinner, ErrorBoundary } from "./Components/shared";

// Lazy load page components for better initial load performance
const Home = lazy(() => import("./Pages/Home/Home"));
const Movies = lazy(() => import("./Pages/Movies/Movies"));
const Tv = lazy(() => import("./Pages/Tv/Tv"));
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));
const Logout = lazy(() => import("./Pages/Logout/Logout"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const People = lazy(() => import("./Pages/People/People"));
const Search = lazy(() => import("./Pages/Search/Search"));
const AboutMovie = lazy(() => import("./Pages/About/aboutMovie"));
const AboutTv = lazy(() => import("./Pages/About/aboutTv"));
const AboutPerson = lazy(() => import("./Pages/About/aboutPerson"));
const SeasonData = lazy(() => import("./Components/Tv Seasons/SeasonData"));
const Episode = lazy(() => import("./Components/Tv Seasons/Episode"));

// Loading fallback component for Suspense
const PageLoader = () => (
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

export default class App extends Component {
    render() {
        const token = localStorage.getItem("token");
        const isAuthenticated = !!token;

        return (
            <ErrorBoundary>
                <div className="layer"></div>
                <ScrollToTop />

                {/* Show appropriate navbar based on auth state */}
                {isAuthenticated ? <Navbar /> : <SolidNavbar />}

                <Suspense fallback={<PageLoader />}>
                    <Switch>
                        <ProtectedRoute path="/home" component={Home} />

                        {/* Specific routes with params must come before generic routes */}
                        <ProtectedRoute path="/movies/:id" component={AboutMovie} />
                        <ProtectedRoute path="/series/:id" component={AboutTv} />
                        <ProtectedRoute path="/actors/:id" component={AboutPerson} />
                        <ProtectedRoute path="/season/:seasonNumber" component={SeasonData} />
                        <ProtectedRoute path="/episode/:episodeNumber" component={Episode} />

                        {/* Generic list routes */}
                        <ProtectedRoute exact path="/movies" component={Movies} />
                        <ProtectedRoute exact path="/series" component={Tv} />
                        <ProtectedRoute exact path="/actors" component={People} />

                        <ProtectedRoute path="/search" component={Search} />

                        {/* Auth routes */}
                        <CheckToken path="/login" component={Login} />
                        <CheckToken path="/register" component={Register} />
                        <Route path="/logout" component={Logout} />

                        {/* Redirects and fallback */}
                        <Redirect exact from="/" to="/login" />
                        <ProtectedRoute path="*" component={NotFound} />
                    </Switch>
                </Suspense>

                <Footer />
            </ErrorBoundary>
        );
    }
}
