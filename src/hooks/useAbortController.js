import { useEffect, useRef } from "react";

/**
 * Custom hook for managing AbortController in components
 * Automatically aborts pending requests on unmount or dependency change
 * @returns {Function} - Function that returns a new AbortController signal
 */
export const useAbortController = () => {
    const controllerRef = useRef(null);

    const getSignal = () => {
        // Abort any previous request
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        // Create new controller
        controllerRef.current = new AbortController();
        return controllerRef.current.signal;
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, []);

    return getSignal;
};

/**
 * Create an AbortController with auto-cleanup
 * @returns {{ controller: AbortController, abort: Function }}
 */
export const createAbortController = () => {
    const controller = new AbortController();
    return {
        controller,
        signal: controller.signal,
        abort: () => controller.abort(),
    };
};

export default useAbortController;
