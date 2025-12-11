import React, { useState, useEffect, useCallback, memo, useRef } from "react";

// Throttle utility function
const throttle = (func, limit) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

const ScrollToTop = memo(() => {
    const [isVisible, setIsVisible] = useState(false);
    const throttledToggleRef = useRef(null);

    // Memoized scroll handler
    const toggleVisibility = useCallback(() => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
        // Create throttled version (150ms throttle)
        throttledToggleRef.current = throttle(toggleVisibility, 150);

        document.addEventListener("scroll", throttledToggleRef.current, { passive: true });

        return () => {
            document.removeEventListener("scroll", throttledToggleRef.current);
        };
    }, [toggleVisibility]);

    const scrollToTop = useCallback(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <div className="back-to-top show-back-to-top">
            {isVisible && (
                <div className="top" onClick={scrollToTop}>
                    <i className="fas fa-arrow-circle-up"></i>
                </div>
            )}
        </div>
    );
});

ScrollToTop.displayName = "ScrollToTop";

export default ScrollToTop;
