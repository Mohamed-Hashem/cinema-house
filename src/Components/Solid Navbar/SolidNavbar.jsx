import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import img from "./../../images/movie.svg";

export default class SolidNavbar extends Component {
	render() {
		return (
			<>
				<nav className="navbar navbar-expand-lg fixed-top navbar-dark pb-4 pt-3">
					<div className="container-fluid">
						<NavLink className="navbar-brand" to="/home" title="cinema house">
							<img src={img} alt="cinema house" title="cinema house" />
							cinema house
						</NavLink>

						<button
							className="navbar-toggler"
							type="button"
							data-toggle="collapse"
							data-target="#navbarSupportedContent"
							aria-controls="navbarSupportedContent"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>

						<div
							className="collapse navbar-collapse"
							id="navbarSupportedContent"
						>
							<ul className="nav navbar-nav ml-auto">
								<li className="nav-item">
									<NavLink className="nav-link" to="/login" title="Login">
										Login
									</NavLink>
								</li>
								<li className="nav-item">
									<NavLink className="nav-link" to="/register" title="Register">
										Register
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</nav>
			</>
		);
	}
}
