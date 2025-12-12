import React, { useEffect, useCallback, useState, useMemo } from "react";
import AliceCarousel from "react-alice-carousel";

const PosterModal = ({ isOpen, images, currentIndex, onClose, title, getImageUrl }) => {
    const [activeIndex, setActiveIndex] = useState(currentIndex || 0);

    const handleKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") onClose();
        },
        [onClose]
    );

    useEffect(() => {
        setActiveIndex(currentIndex || 0);
    }, [currentIndex]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.body.style.overflow = "auto";
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

    const items = useMemo(
        () =>
            images?.map((img, index) => (
                <div key={img.file_path || `slide-${index}`} style={styles.slideContainer}>
                    <img
                        src={getImageUrl(img.file_path, true)}
                        alt={`${title} - ${index + 1}`}
                        style={styles.modalImage}
                        draggable={false}
                    />
                </div>
            )),
        [images, title, getImageUrl]
    );

    if (!isOpen || !images?.length) return null;

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} style={styles.closeButton} aria-label="Close modal">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>

                <h3 style={styles.title}>{title}</h3>

                <div style={styles.carouselWrapper}>
                    <AliceCarousel
                        items={items}
                        activeIndex={activeIndex}
                        onSlideChanged={(e) => setActiveIndex(e.item)}
                        infinite
                        disableDotsControls
                        mouseTracking
                        touchTracking
                        renderPrevButton={() => (
                            <button
                                style={{ ...styles.navButton, left: "10px" }}
                                aria-label="Previous"
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                        )}
                        renderNextButton={() => (
                            <button
                                style={{ ...styles.navButton, right: "10px" }}
                                aria-label="Next"
                            >
                                <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </button>
                        )}
                    />
                </div>

                <p style={styles.counter}>
                    {activeIndex + 1} / {images.length}
                </p>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "20px",
    },
    modal: {
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        maxHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    closeButton: {
        position: "absolute",
        top: "-40px",
        right: "0",
        background: "transparent",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "50%",
        transition: "all 0.2s ease",
        zIndex: 10,
    },
    title: {
        color: "#fff",
        marginBottom: "20px",
        fontSize: "1.5rem",
        textAlign: "center",
    },
    carouselWrapper: {
        width: "100%",
        position: "relative",
    },
    slideContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 50px",
    },
    modalImage: {
        maxWidth: "100%",
        maxHeight: "70vh",
        objectFit: "contain",
        borderRadius: "8px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
    },
    navButton: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        background: "rgba(255, 255, 255, 0.1)",
        border: "none",
        color: "#fff",
        cursor: "pointer",
        padding: "12px",
        borderRadius: "50%",
        transition: "all 0.2s ease",
        zIndex: 10,
    },
    counter: {
        color: "#888",
        marginTop: "15px",
        fontSize: "0.9rem",
    },
};

export default PosterModal;
