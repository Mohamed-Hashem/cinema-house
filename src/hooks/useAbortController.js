import { useEffect, useRef } from "react";

export const useAbortController = () => {
    const controllerRef = useRef(null);

    const getSignal = () => {
        if (controllerRef.current) {
            controllerRef.current.abort();
        }
        controllerRef.current = new AbortController();
        return controllerRef.current.signal;
    };

    useEffect(() => {
        return () => {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
        };
    }, []);

    return getSignal;
};

export const createAbortController = () => {
    const controller = new AbortController();
    return {
        controller,
        signal: controller.signal,
        abort: () => controller.abort(),
    };
};

export default useAbortController;
