import { useCallback, useRef } from "react";

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
