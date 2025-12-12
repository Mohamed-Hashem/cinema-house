export const createApiMethod = (axiosInstance, method, endpoint) => (data, config) =>
    method === "get" || method === "delete"
        ? axiosInstance[method](endpoint, config)
        : axiosInstance[method](endpoint, data, config);

export const createGetMethod = (axiosInstance, endpoint) => (params, signal) =>
    axiosInstance.get(endpoint, { params, signal });

export const createMediaMethod = (axiosInstance, basePath) => (id, signal) =>
    axiosInstance.get(`${basePath}/${id}`, { signal });
