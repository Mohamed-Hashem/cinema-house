import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { CircleArrowUpIcon } from "../shared";

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
    const location = useLocation();
    const prevPathRef = useRef(location.pathname);

    // Scroll to top on route change
    useEffect(() => {
        // Only scroll if path actually changed (not just query params)
        if (prevPathRef.current !== location.pathname) {
            // Use requestAnimationFrame for smoother scroll
            requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: "instant" });
            });
            prevPathRef.current = location.pathname;
        }
    }, [location.pathname]);

    // Memoized scroll handler
    const toggleVisibility = useCallback(() => {
        if (window.pageYOffset > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, []);

    useEffect(() => {
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
                <div className="top" onClick={scrollToTop} role="button" aria-label="Scroll to top">
                    <CircleArrowUpIcon size={40} />
                </div>
            )}
        </div>
    );
});

ScrollToTop.displayName = "ScrollToTop";

export default ScrollToTop;
