import jwt_decode from "jwt-decode";
import React, { useMemo, memo } from "react";
import { Redirect, Route } from "react-router-dom";

/**
 * Validates if a JWT token is valid and not expired
 */
const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decoded = jwt_decode(token);
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

/**
 * Protected Route component - redirects to login if not authenticated
 * Memoized for better performance
 */
const ProtectedRoute = memo(({ component: Component, path, exact, ...rest }) => {
    const isAuthenticated = useMemo(() => {
        const token = localStorage.getItem("token");
        return isTokenValid(token);
    }, []);

    if (!isAuthenticated) {
        return <Redirect to="/login" />;
    }

    return <Route path={path} exact={exact} component={Component} {...rest} />;
});

ProtectedRoute.displayName = "ProtectedRoute";

export default ProtectedRoute;
