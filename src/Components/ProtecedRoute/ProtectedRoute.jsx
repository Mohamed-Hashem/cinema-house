import jwt_decode from "jwt-decode";
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
	render() {
		const token = localStorage.getItem("token");

		try {
			if (token !== null) jwt_decode(token);
		} catch (error) {
			localStorage.removeItem("token");
			console.log("Error ", error.message);
		}
		return token ? (
			<Route path={this.props.path} component={this.props.component} />
		) : (
			<Redirect to="/login" />
		);
	}
}
