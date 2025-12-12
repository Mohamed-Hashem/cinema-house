import React, { useState, memo, useEffect, useCallback } from "react";

const DEFAULT_FALLBACK = "https://via.placeholder.com/300x450?text=No+Image";

const ImageWithFallback = memo(
    ({
        src,
        alt = "",
        fallbackSrc = DEFAULT_FALLBACK,
        className = "",
        style = {},
        width,
        height,
        loading = "lazy",
        onLoad: onLoadCallback,
        onError: onErrorCallback,
    }) => {
        const [imgSrc, setImgSrc] = useState(src);
        const [isLoading, setIsLoading] = useState(true);

        const handleLoad = useCallback(
            (e) => {
                setIsLoading(false);
                onLoadCallback?.(e);
            },
            [onLoadCallback]
        );

        const handleError = useCallback(
            (e) => {
                setIsLoading(false);
                if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
                onErrorCallback?.(e);
            },
            [imgSrc, fallbackSrc, onErrorCallback]
        );

        useEffect(() => {
            setImgSrc(src);
            setIsLoading(true);
        }, [src]);

        return (
            <div
                className={`image-with-fallback-container ${className}`}
                style={{ position: "relative", overflow: "hidden", width, height, ...style }}
            >
                {isLoading && (
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "#2f2f2f",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        aria-hidden="true"
                    >
                        <div className="image-spinner" />
                    </div>
                )}
                <img
                    src={imgSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    loading={loading}
                    decoding="async"
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
                <style>{`
                .image-spinner {
                    width: 40px;
                    height: 40px;
                    border: 3px solid #444;
                    border-top-color: #e50914;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
            </div>
        );
    }
);

ImageWithFallback.displayName = "ImageWithFallback";

export default ImageWithFallback;
