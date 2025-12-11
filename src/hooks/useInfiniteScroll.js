import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Custom hook for infinite scroll functionality
 * @param {Function} fetchMore - Function to call when more items should be loaded
 * @param {Object} options - IntersectionObserver options
 * @returns {Object} - { loadingRef, page, isLoading }
 */
const useInfiniteScroll = (fetchMore, options) => {
    const [page, setPage] = useState(1);
    const [prevY, setPrevY] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const loadingRef = useRef(null);
    const observerRef = useRef(null);

    const defaultOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
        ...options,
    };

    const handleObserver = useCallback(
        (entities) => {
            const y = entities[0].boundingClientRect.y;

            if (prevY > y && isLoading) {
                const nextPage = page + 1;
                fetchMore(nextPage);
                setPage(nextPage);
            }
            setPrevY(y);
        },
        [prevY, page, fetchMore, isLoading]
    );

    useEffect(() => {
        observerRef.current = new IntersectionObserver(handleObserver, defaultOptions);

        if (loadingRef.current) {
            observerRef.current.observe(loadingRef.current);
        }

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleObserver]);

    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, []);

    const resetScroll = useCallback(() => {
        setPage(1);
        setPrevY(0);
        setIsLoading(false);
    }, []);

    return {
        loadingRef,
        page,
        isLoading,
        startLoading,
        resetScroll,
    };
};

export default useInfiniteScroll;
