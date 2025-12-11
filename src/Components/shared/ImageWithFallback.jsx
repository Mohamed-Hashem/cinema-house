import React, { useState, memo, useEffect } from "react";

/**
 * ImageWithFallback - A reusable image component with lazy loading,
 * error handling, and fallback support.
 */
function ImageWithFallback(props) {
    var src = props.src;
    var alt = props.alt || "";
    var fallbackSrc = props.fallbackSrc || "https://via.placeholder.com/300x450?text=No+Image";
    var className = props.className || "";
    var style = props.style || {};
    var width = props.width;
    var height = props.height;
    var loading = props.loading || "lazy";
    var onLoadCallback = props.onLoad;
    var onErrorCallback = props.onError;

    var imgState = useState(src);
    var imgSrc = imgState[0];
    var setImgSrc = imgState[1];

    var loadingState = useState(true);
    var isLoading = loadingState[0];
    var setIsLoading = loadingState[1];

    function handleLoad(e) {
        setIsLoading(false);
        if (onLoadCallback) {
            onLoadCallback(e);
        }
    }

    function handleError(e) {
        setIsLoading(false);

        if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
        }

        if (onErrorCallback) {
            onErrorCallback(e);
        }
    }

    // Reset state when src changes
    useEffect(
        function () {
            setImgSrc(src);
            setIsLoading(true);
        },
        [src, setImgSrc, setIsLoading]
    );

    return (
        <div
            className={"image-with-fallback-container " + className}
            style={Object.assign(
                {
                    position: "relative",
                    overflow: "hidden",
                    width: width,
                    height: height,
                },
                style
            )}
        >
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "#2f2f2f",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    aria-hidden="true"
                >
                    <div
                        style={{
                            width: "40px",
                            height: "40px",
                            border: "3px solid #444",
                            borderTopColor: "#e50914",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                        }}
                    />
                </div>
            )}
            <img
                src={imgSrc}
                alt={alt}
                loading={loading}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.3s ease-in-out",
                }}
            />
            <style>
                {
                    "\n                    @keyframes spin {\n                        to { transform: rotate(360deg); }\n                    }\n                "
                }
            </style>
        </div>
    );
}

export default memo(ImageWithFallback);
