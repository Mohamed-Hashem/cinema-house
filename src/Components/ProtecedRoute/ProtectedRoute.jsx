import jwt_decode from "jwt-decode";
import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

export default class ProtectedRoute extends Component {
    isTokenValid = (token) => {
        try {
            const decoded = jwt_decode(token);
            // Check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                return false;
            }
            return true;
        } catch (error) {
            localStorage.removeItem("token");
            return false;
        }
    };

    render() {
        const token = localStorage.getItem("token");

        if (token && this.isTokenValid(token)) {
            return <Route path={this.props.path} component={this.props.component} />;
        }

        return <Redirect to="/login" />;
    }
}
