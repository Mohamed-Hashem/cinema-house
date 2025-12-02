import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import CheckToken from "./Components/CheckToken/CheckToken";
import Footer from "./Components/Footer/Footer";
import Navbar from "./Components/Navbar/Navbar";
import ProtectedRoute from "./Components/ProtecedRoute/ProtectedRoute";
import ScrollToTop from "./Components/Scrolls/ScrollToTop";
import Episode from "./Components/Tv Seasons/Episode";
import SeasonData from "./Components/Tv Seasons/SeasonData";
import aboutPerson from "./Pages/About/aboutPerson.jsx";
import aboutTv from "./Pages/About/aboutTv";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Logout from "./Pages/Logout/Logout";
import Movies from "./Pages/Movies/Movies";
import NotFound from "./Pages/NotFound/NotFound";
import Actors from "./Pages/Actors/Actors";
import Register from "./Pages/Register/Register";
import Search from "./Pages/Search/Search";
import Series from "./Pages/Series/Series";
import aboutMovie from "./Pages/About/aboutMovie";

export default class App extends Component {
	render() {
		return (
			<>
				<ToastContainer />
				<Navbar />
				<ScrollToTop />

				<Switch>
					<ProtectedRoute path="/home" component={Home} />

					<ProtectedRoute exact path="/movies" component={Movies} />
					<ProtectedRoute exact path="/series" component={Series} />
					<ProtectedRoute exact path="/actors" component={Actors} />

					<ProtectedRoute path="/search" component={Search} />

					<ProtectedRoute path="/movies/:id" component={aboutMovie} />
					<ProtectedRoute path="/series/:id" component={aboutTv} />
					<ProtectedRoute path="/actors/:id" component={aboutPerson} />

					<ProtectedRoute path="/season" component={SeasonData} />
					<ProtectedRoute path="/episode" component={Episode} />

					<CheckToken path="/login" component={Login} />
					<CheckToken path="/register" component={Register} />

					<Route path="/logout" component={Logout} />

					<Redirect exact from="/" to="/login" />
					<ProtectedRoute path="/*" component={NotFound} />
				</Switch>

				<Footer />
			</>
		);
	}
}
