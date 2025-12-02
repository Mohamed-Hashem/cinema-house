import jwt_decode from "jwt-decode";
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class CheckToken extends Component {
	render() {
		const token = localStorage.getItem("token");

		try {
			if (token !== null) jwt_decode(this.token);
		} catch (error) {
			return <Route path={this.props.path} component={this.props.component} />;
		}

		return token ? (
			<Redirect to="/home" />
		) : (
			<Route path={this.props.path} component={this.props.component} />
		);
	}
}
