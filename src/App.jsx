import React, { Component, Suspense, lazy, memo } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import SolidNavbar from "./Components/Solid Navbar/SolidNavbar";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import ProtectedRoute from "./Components/ProtecedRoute/ProtectedRoute";
import CheckToken from "./Components/CheckToken/CheckToken";
import { LoadingSpinner, ErrorBoundary } from "./Components/shared";
import ROUTES from "./utils/routes";
const Home = lazy(() => import(/* webpackChunkName: "home" */ "./Pages/Home/Home"));
const Movies = lazy(() => import(/* webpackChunkName: "movies-list" */ "./Pages/Movies/Movies"));
const Tv = lazy(() => import(/* webpackChunkName: "tv-list" */ "./Pages/Tv/Tv"));
const Login = lazy(() => import(/* webpackChunkName: "auth" */ "./Pages/Login/Login"));
const Register = lazy(() => import(/* webpackChunkName: "auth" */ "./Pages/Register/Register"));
const Logout = lazy(() => import(/* webpackChunkName: "auth" */ "./Pages/Logout/Logout"));
const Profile = lazy(() => import(/* webpackChunkName: "profile" */ "./Pages/Profile/Profile"));
const NotFound = lazy(
    () => import(/* webpackChunkName: "not-found" */ "./Pages/NotFound/NotFound")
);
const Actors = lazy(() => import(/* webpackChunkName: "actors-list" */ "./Pages/Actors/Actors"));
const Search = lazy(() => import(/* webpackChunkName: "search" */ "./Pages/Search/Search"));

const AboutMovie = lazy(
    () => import(/* webpackChunkName: "movie-detail" */ "./Pages/About/aboutMovie")
);
const AboutTv = lazy(() => import(/* webpackChunkName: "tv-detail" */ "./Pages/About/aboutTv"));
const AboutActor = lazy(
    () => import(/* webpackChunkName: "actor-detail" */ "./Pages/About/aboutActor")
);
const SeasonData = lazy(
    () => import(/* webpackChunkName: "tv-season" */ "./Components/Tv Seasons/SeasonData")
);
const Episode = lazy(
    () => import(/* webpackChunkName: "tv-episode" */ "./Components/Tv Seasons/Episode")
);

const PageLoader = memo(() => (
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
));
PageLoader.displayName = "PageLoader";

class App extends Component {
    state = {
        isAuthenticated: !!localStorage.getItem("token"),
    };

    checkAuth = () => {
        const token = localStorage.getItem("token");
        const isAuthenticated = !!token;
        if (this.state.isAuthenticated !== isAuthenticated) {
            this.setState({ isAuthenticated });
        }
    };

    componentDidMount() {
        this.checkAuth();
        window.addEventListener("storage", this.checkAuth);
        this.unlisten = this.props.history.listen(() => {
            this.checkAuth();
        });
    }

    componentWillUnmount() {
        window.removeEventListener("storage", this.checkAuth);
        if (this.unlisten) {
            this.unlisten();
        }
    }

    render() {
        const { isAuthenticated } = this.state;

        return (
            <ErrorBoundary>
                <a href="#main-content" className="skip-link">
                    Skip to main content
                </a>
                <div className="layer"></div>
                <ScrollToTop />

                {isAuthenticated ? <Navbar /> : <SolidNavbar />}

                <main id="main-content">
                    <Suspense fallback={<PageLoader />}>
                        <Switch>
                            <ProtectedRoute path={ROUTES.HOME} component={Home} />
                            <ProtectedRoute path={ROUTES.PROFILE} component={Profile} />

                            <ProtectedRoute path={ROUTES.EPISODE_DETAIL} component={Episode} />
                            <ProtectedRoute path={ROUTES.SEASON_DETAIL} component={SeasonData} />
                            <ProtectedRoute path={ROUTES.MOVIE_DETAIL} component={AboutMovie} />
                            <ProtectedRoute path={ROUTES.SERIES_DETAIL} component={AboutTv} />
                            <ProtectedRoute path={ROUTES.ACTOR_DETAIL} component={AboutActor} />

                            <ProtectedRoute exact path={ROUTES.MOVIES} component={Movies} />
                            <ProtectedRoute exact path={ROUTES.SERIES} component={Tv} />
                            <ProtectedRoute exact path={ROUTES.ACTORS} component={Actors} />
                            <ProtectedRoute path={ROUTES.SEARCH} component={Search} />

                            <CheckToken path={ROUTES.LOGIN} component={Login} />
                            <CheckToken path={ROUTES.REGISTER} component={Register} />
                            <Route path={ROUTES.LOGOUT} component={Logout} />

                            <Redirect exact from="/" to={ROUTES.LOGIN} />
                            <ProtectedRoute path="*" component={NotFound} />
                        </Switch>
                    </Suspense>
                </main>

                <Footer />
            </ErrorBoundary>
        );
    }
}

export default withRouter(App);
