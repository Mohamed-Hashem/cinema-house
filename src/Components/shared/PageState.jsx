import React from "react";
import { LoadingSpinner } from "./index";

const PageState = ({ loading, error, children }) => {
    if (loading) {
        return (
            <div className="profile-container">
                <LoadingSpinner height={60} width={60} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <div className="error-message">
                    <h3>Error</h3>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return children;
};

export default PageState;
