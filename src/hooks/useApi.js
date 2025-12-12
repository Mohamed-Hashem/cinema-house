import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Custom hook for API calls with loading, error handling, and abort control
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch }
 */
export const useApi = (apiFunction, options = {}) => {
    const { immediate = true, params = [], onSuccess, onError, deps = [] } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);
    const abortControllerRef = useRef(null);
    const isMountedRef = useRef(true);

    const execute = useCallback(
        async (...args) => {
            try {
                // Abort previous request
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }

                abortControllerRef.current = new AbortController();
                setLoading(true);
                setError(null);

                const response = await apiFunction(...args, abortControllerRef.current.signal);

                if (isMountedRef.current) {
                    const responseData = response.data;
                    setData(responseData);
                    setLoading(false);
                    onSuccess?.(responseData);
                }

                return response;
            } catch (err) {
                if (isMountedRef.current && err.name !== "AbortError") {
                    const errorMessage =
                        err.response?.data?.message || err.message || "An error occurred";
                    setError(errorMessage);
                    setLoading(false);
                    onError?.(err);
                }
                throw err;
            }
        },
        [apiFunction, onSuccess, onError]
    );

    useEffect(() => {
        isMountedRef.current = true;

        if (immediate) {
            execute(...params);
        }

        return () => {
            isMountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [immediate, ...deps]);

    const refetch = useCallback((...args) => execute(...args), [execute]);

    return { data, loading, error, refetch, execute };
};

/**
 * Custom hook for paginated API calls
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, loadMore, hasMore, reset }
 */
export const usePaginatedApi = (apiFunction, options = {}) => {
    const { initialPage = 1, pageSize = 20, mediaType } = options;

    const [data, setData] = useState([]);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const abortControllerRef = useRef(null);
    const isMountedRef = useRef(true);

    const loadPage = useCallback(
        async (pageNum) => {
            try {
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort();
                }

                abortControllerRef.current = new AbortController();
                setLoading(true);
                setError(null);

                const response = await apiFunction(
                    mediaType,
                    pageNum,
                    abortControllerRef.current.signal
                );

                if (isMountedRef.current) {
                    const results = response.data.results || [];
                    const totalPages = response.data.total_pages || 1;

                    setData((prevData) => {
                        const combined = [...prevData, ...results];
                        // Remove duplicates
                        return Array.from(
                            new Map(combined.map((item) => [item.id, item])).values()
                        );
                    });

                    setHasMore(pageNum < totalPages);
                    setLoading(false);
                }
            } catch (err) {
                if (isMountedRef.current && err.name !== "AbortError") {
                    setError(err.response?.data?.message || err.message);
                    setLoading(false);
                }
            }
        },
        [apiFunction, mediaType]
    );

    useEffect(() => {
        isMountedRef.current = true;
        loadPage(page);

        return () => {
            isMountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [page, loadPage]);

    const loadMore = useCallback(() => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    }, [loading, hasMore]);

    const reset = useCallback(() => {
        setData([]);
        setPage(initialPage);
        setHasMore(true);
        setError(null);
    }, [initialPage]);

    return { data, loading, error, loadMore, hasMore, reset, page };
};

export default useApi;
