import React, { Component } from "react";

/**
 * ErrorBoundary - A reusable error boundary component for catching
 * JavaScript errors in child component trees, including lazy loading failures.
 *
 * Usage:
 * <ErrorBoundary fallback={<CustomErrorUI />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        // Log error to an error reporting service if needed
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            // Custom fallback UI if provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default fallback UI
            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "50vh",
                        padding: "20px",
                        textAlign: "center",
                        backgroundColor: "#141414",
                        color: "#fff",
                    }}
                >
                    <h2 style={{ marginBottom: "16px", color: "#e50914" }}>
                        Oops! Something went wrong
                    </h2>
                    <p style={{ marginBottom: "24px", color: "#b3b3b3" }}>
                        {this.state.error?.message || "An unexpected error occurred"}
                    </p>
                    <button
                        onClick={this.handleRetry}
                        style={{
                            padding: "12px 24px",
                            backgroundColor: "#e50914",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "16px",
                            fontWeight: "bold",
                            transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#f40612")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#e50914")}
                    >
                        Try Again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
