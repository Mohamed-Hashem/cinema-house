import { useCallback, useRef } from "react";

/**
 * Custom hook for throttling function calls
 * @param {Function} callback - The function to throttle
 * @param {number} delay - Minimum time between calls in milliseconds
 * @returns {Function} - Throttled function
 */
export const useThrottle = (callback, delay = 200) => {
    const lastRan = useRef(Date.now());
    const timeoutRef = useRef(null);

    return useCallback(
        (...args) => {
            const now = Date.now();
            const timeSinceLastRun = now - lastRan.current;

            if (timeSinceLastRun >= delay) {
                callback(...args);
                lastRan.current = now;
            } else {
                // Schedule for the remaining time
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }
                timeoutRef.current = setTimeout(() => {
                    callback(...args);
                    lastRan.current = Date.now();
                }, delay - timeSinceLastRun);
            }
        },
        [callback, delay]
    );
};

/**
 * Throttle function (non-hook version)
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} - Throttled function
 */
export const throttle = (func, limit = 200) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
};

export default useThrottle;
