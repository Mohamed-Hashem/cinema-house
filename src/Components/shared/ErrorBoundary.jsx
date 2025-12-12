import React, { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    handleGoHome = () => {
        this.setState({ hasError: false, error: null });
        window.location.href = "/#/home";
    };

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "70vh",
                        padding: "40px 20px",
                        textAlign: "center",
                        background:
                            "linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
                        color: "#fff",
                        position: "relative",
                        overflow: "hidden",
                        width: "60%",
                        margin: "60px auto",
                        borderRadius: "12px",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            width: "300px",
                            height: "300px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(229, 9, 20, 0.15) 0%, transparent 70%)",
                            top: "-100px",
                            left: "-100px",
                            animation: "pulse 4s ease-in-out infinite",
                            pointerEvents: "none",
                        }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            width: "400px",
                            height: "400px",
                            borderRadius: "50%",
                            background:
                                "radial-gradient(circle, rgba(139, 153, 224, 0.1) 0%, transparent 70%)",
                            bottom: "-150px",
                            right: "-150px",
                            animation: "pulse 5s ease-in-out infinite reverse",
                            pointerEvents: "none",
                        }}
                    />

                    <div
                        style={{
                            width: "100px",
                            height: "100px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: "30px",
                            boxShadow: "0 10px 40px rgba(229, 9, 20, 0.4)",
                            animation: "bounce 2s ease-in-out infinite",
                        }}
                    >
                        <svg
                            width="50"
                            height="50"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#fff"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                    </div>

                    <h2
                        style={{
                            marginBottom: "16px",
                            fontSize: "2.5rem",
                            fontWeight: "700",
                            background: "linear-gradient(90deg, #e50914, #ff6b6b)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            textShadow: "none",
                        }}
                    >
                        Oops! Something went wrong
                    </h2>

                    <p
                        style={{
                            marginBottom: "12px",
                            color: "#a0a0a0",
                            fontSize: "1.1rem",
                            maxWidth: "500px",
                            lineHeight: "1.6",
                        }}
                    >
                        {this.state.error?.message ||
                            "An unexpected error occurred while loading this page."}
                    </p>

                    <p
                        style={{
                            marginBottom: "35px",
                            color: "#666",
                            fontSize: "0.9rem",
                        }}
                    >
                        Don&apos;t worry, you can try again or go back to the homepage.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "16px",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        <button
                            onClick={this.handleRetry}
                            style={{
                                padding: "16px 40px",
                                background: "linear-gradient(135deg, #e50914 0%, #b20710 100%)",
                                color: "#fff",
                                border: "none",
                                borderRadius: "50px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                fontWeight: "600",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                boxShadow: "0 8px 30px rgba(229, 9, 20, 0.4)",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                                e.currentTarget.style.boxShadow =
                                    "0 12px 40px rgba(229, 9, 20, 0.5)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(1)";
                                e.currentTarget.style.boxShadow =
                                    "0 8px 30px rgba(229, 9, 20, 0.4)";
                            }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = "translateY(0) scale(0.98)";
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                            </svg>
                            Try Again
                        </button>

                        <button
                            onClick={this.handleGoHome}
                            style={{
                                padding: "16px 40px",
                                background: "transparent",
                                color: "#fff",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                borderRadius: "50px",
                                cursor: "pointer",
                                fontSize: "1rem",
                                fontWeight: "600",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.transform = "translateY(-3px)";
                                e.currentTarget.style.borderColor = "#8b99e0";
                                e.currentTarget.style.background = "rgba(139, 153, 224, 0.1)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
                                e.currentTarget.style.background = "transparent";
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            Go Home
                        </button>
                    </div>

                    <style>
                        {`
                            @keyframes pulse {
                                0%, 100% { transform: scale(1); opacity: 0.5; }
                                50% { transform: scale(1.1); opacity: 0.8; }
                            }
                            @keyframes bounce {
                                0%, 100% { transform: translateY(0); }
                                50% { transform: translateY(-10px); }
                            }
                        `}
                    </style>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
