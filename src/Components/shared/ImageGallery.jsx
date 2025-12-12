import React, { useState, useMemo, useCallback, memo } from "react";
import AliceCarousel from "react-alice-carousel";
import PosterModal from "./PosterModal";

const RESPONSIVE_CONFIG = {
    0: { items: 2 },
    576: { items: 2 },
    768: { items: 2 },
    992: { items: 2 },
    1200: { items: 2 },
    1400: { items: 2 },
};

const NAV_BUTTON_STYLE = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(0,0,0,0.7)",
    border: "none",
    borderRadius: "50%",
    width: "40px",
    height: "40px",
    cursor: "pointer",
    color: "#fff",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    transition: "all 0.2s",
};

const NavButton = memo(({ direction }) => (
    <button
        style={{ ...NAV_BUTTON_STYLE, [direction === "prev" ? "left" : "right"]: "-15px" }}
        onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.9)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1.1)";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(0,0,0,0.7)";
            e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
    >
        {direction === "prev" ? "‹" : "›"}
    </button>
));

NavButton.displayName = "NavButton";

const ImageGallery = ({
    images,
    title,
    getImageUrl,
    aspectRatio = "16/9",
    itemsPerView = RESPONSIVE_CONFIG,
    autoPlayInterval = 3000,
    showTitle = true,
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const validImages = useMemo(() => images?.filter((img) => img.file_path) || [], [images]);

    const handleImageClick = useCallback((index) => {
        setSelectedIndex(index);
        setModalOpen(true);
    }, []);

    const PosterItem = useCallback(
        ({ img, index }) => (
            <div
                className="gallery-item"
                onClick={() => handleImageClick(index)}
                style={{
                    position: "relative",
                    aspectRatio,
                    borderRadius: "6px",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    backgroundColor: "#0d1117",
                    padding: "0 5px",
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.5)";
                    const overlay = e.currentTarget.querySelector(".poster-overlay");
                    if (overlay) overlay.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "none";
                    const overlay = e.currentTarget.querySelector(".poster-overlay");
                    if (overlay) overlay.style.opacity = "0";
                }}
            >
                <img
                    src={getImageUrl(img.file_path, false)}
                    loading="lazy"
                    decoding="async"
                    fetchpriority={index < 3 ? "high" : undefined}
                    alt={`${title} ${aspectRatio === "2/3" ? "photo" : "poster"} ${index + 1}`}
                    draggable={false}
                    onError={(e) => {
                        e.target.style.opacity = "0.5";
                    }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div
                    className="poster-overlay"
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                        opacity: 0,
                        transition: "opacity 0.25s ease",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        padding: "8px",
                        pointerEvents: "none",
                    }}
                >
                    <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 500 }}>
                        🔍 Click to view
                    </span>
                </div>
            </div>
        ),
        [handleImageClick, title, getImageUrl, aspectRatio]
    );

    const items = useMemo(
        () =>
            validImages.map((img, index) => (
                <PosterItem key={img.file_path || index} img={img} index={index} />
            )),
        [validImages]
    );

    if (!validImages.length) return null;

    return (
        <>
            <div className="w-100 line my-3" />

            {showTitle && (
                <div style={{ textAlign: "center", marginBottom: "15px" }}>
                    <h3 style={{ marginBottom: "5px" }}>
                        {aspectRatio === "2/3" ? "Photos of " : "Posters For "}
                        <b className="text-info">{title}</b>
                    </h3>
                    <p style={{ color: "#888", fontSize: "0.85rem", margin: 0 }}>
                        {validImages.length} {validImages.length === 1 ? "image" : "images"} • Click
                        to enlarge
                    </p>
                </div>
            )}

            <AliceCarousel
                autoPlay
                responsive={itemsPerView}
                infinite
                autoPlayInterval={autoPlayInterval}
                disableDotsControls
                mouseTracking
                items={items}
                paddingLeft={5}
                paddingRight={5}
                animationDuration={600}
                touchTracking
                renderPrevButton={() => <NavButton direction="prev" />}
                renderNextButton={() => <NavButton direction="next" />}
            />

            <PosterModal
                isOpen={modalOpen}
                images={validImages}
                currentIndex={selectedIndex}
                onClose={() => setModalOpen(false)}
                title={title}
                getImageUrl={getImageUrl}
            />
        </>
    );
};

export default ImageGallery;
