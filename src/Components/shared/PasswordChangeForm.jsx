import React, { useState } from "react";
import { FormInput, MessageBanner } from "./index";

const PasswordChangeForm = ({ onSubmit, loading, error, success }) => {
    const [passwords, setPasswords] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [validationErrors, setValidationErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswords((prev) => ({ ...prev, [name]: value }));
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validatePasswords = () => {
        const errors = {};

        if (!passwords.currentPassword) {
            errors.currentPassword = "Current password is required";
        }

        if (!passwords.newPassword) {
            errors.newPassword = "New password is required";
        } else if (passwords.newPassword.length < 6) {
            errors.newPassword = "Password must be at least 6 characters";
        }

        if (!passwords.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (passwords.newPassword !== passwords.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePasswords()) {
            onSubmit(passwords);
            setPasswords({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="password-change-form">
            <h2>Change Password</h2>

            <MessageBanner type="success" message={success} />
            <MessageBanner type="error" message={error} />

            <div className="form-grid">
                <FormInput
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={passwords.currentPassword}
                    onChange={handleChange}
                    error={validationErrors.currentPassword}
                    placeholder="Enter current password"
                    required
                />

                <FormInput
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    error={validationErrors.newPassword}
                    placeholder="Enter new password"
                    minLength="6"
                    required
                />

                <FormInput
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={passwords.confirmPassword}
                    onChange={handleChange}
                    error={validationErrors.confirmPassword}
                    placeholder="Confirm new password"
                    minLength="6"
                    required
                />
            </div>

            <button type="submit" className="btn-save" disabled={loading}>
                {loading ? (
                    <>
                        <span className="spinner"></span>
                        Changing...
                    </>
                ) : (
                    <>
                        <span>🔒</span>
                        Change Password
                    </>
                )}
            </button>
        </form>
    );
};

export default PasswordChangeForm;
