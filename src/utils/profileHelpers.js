export const formatProfileData = (user) => ({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    age: user?.age != null ? String(user.age) : "",
});

export const prepareProfilePayload = (formData) => ({
    first_name: formData.first_name.trim(),
    last_name: formData.last_name.trim(),
    age: parseInt(formData.age, 10),
});

export const clearMessages = (setError, setSuccessMessage) => {
    setError(null);
    setSuccessMessage("");
};

export const handleApiError = (err) => {
    if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        return err.response.data.errors.join(", ");
    }
    if (err.response?.data?.error) {
        return "Server error: " + err.response.data.error;
    }
    return err.response?.data?.message || "An error occurred";
};
