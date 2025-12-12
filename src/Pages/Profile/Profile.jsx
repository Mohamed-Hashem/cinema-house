import React, { useState, useEffect, useCallback } from "react";
import { authService, dataService } from "../../services/api";
import {
    PageState,
    FormInput,
    MessageBanner,
    InfoItem,
    PasswordChangeForm,
} from "../../Components/shared";
import { validateProfileForm } from "../../utils/validation";
import {
    formatProfileData,
    prepareProfilePayload,
    clearMessages,
    handleApiError,
} from "../../utils/profileHelpers";
import "./Profile.scss";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editing, setEditing] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [validationErrors, setValidationErrors] = useState({});
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordSuccess, setPasswordSuccess] = useState("");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
    });

    const fetchProfile = useCallback(async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                setError("No authentication token found");
                setLoading(false);
                return;
            }

            const profileRes = await authService.getProfile();

            if (profileRes.data?.user) {
                const user = profileRes.data.user;
                setProfile(user);
                setFormData(formatProfileData(user));
            }

            try {
                const statsRes = await dataService.getUserStats();
                if (statsRes.data?.stats) {
                    setStats(statsRes.data.stats);
                }
            } catch {}

            setLoading(false);
        } catch (err) {
            setError(handleApiError(err));
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (validationErrors[name]) {
            setValidationErrors((prev) => ({ ...prev, [name]: "" }));
        }
        clearMessages(setError, setSuccessMessage);
    };

    const validateForm = () => {
        const errors = validateProfileForm(formData);
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setUpdateLoading(true);
        clearMessages(setError, setSuccessMessage);

        try {
            const response = await dataService.updateProfile(prepareProfilePayload(formData));

            if (response.data?.user) {
                setProfile(response.data.user);
                setSuccessMessage("Profile updated successfully!");
                setTimeout(() => {
                    setEditing(false);
                    setSuccessMessage("");
                }, 2000);
            }
        } catch (err) {
            setError(handleApiError(err));
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditing(false);
        setValidationErrors({});
        clearMessages(setError, setSuccessMessage);
        setFormData(formatProfileData(profile));
    };

    const handlePasswordChange = async (passwords) => {
        setPasswordLoading(true);
        setPasswordError(null);
        setPasswordSuccess("");

        try {
            await dataService.changePassword({
                currentPassword: passwords.currentPassword,
                newPassword: passwords.newPassword,
            });

            setPasswordSuccess("Password changed successfully!");
            setTimeout(() => {
                setPasswordSuccess("");
            }, 3000);
        } catch (err) {
            setPasswordError(handleApiError(err));
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <PageState loading={loading} error={error}>
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <div className="avatar">
                            {profile?.first_name?.charAt(0)}
                            {profile?.last_name?.charAt(0)}
                        </div>
                        <h1>Profile</h1>
                    </div>

                    <div className="profile-content">
                        {editing ? (
                            <form
                                onSubmit={handleUpdateProfile}
                                className="profile-section edit-form"
                            >
                                <h2>Edit Personal Information</h2>

                                <MessageBanner type="success" message={successMessage} />
                                <MessageBanner type="error" message={error} />

                                <div className="form-grid">
                                    <FormInput
                                        label="First Name"
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleInputChange}
                                        error={validationErrors.first_name}
                                        placeholder="Enter your first name"
                                        maxLength="50"
                                        required
                                    />

                                    <FormInput
                                        label="Last Name"
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleInputChange}
                                        error={validationErrors.last_name}
                                        placeholder="Enter your last name"
                                        maxLength="50"
                                        required
                                    />

                                    <FormInput
                                        label="Age"
                                        name="age"
                                        type="number"
                                        value={formData.age}
                                        onChange={handleInputChange}
                                        error={validationErrors.age}
                                        placeholder="Enter your age"
                                        min="18"
                                        max="120"
                                        required
                                    />
                                </div>

                                <div className="button-group">
                                    <button
                                        type="submit"
                                        className="btn-save"
                                        disabled={updateLoading}
                                    >
                                        {updateLoading ? (
                                            <>
                                                <span className="spinner"></span>
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <span>💾</span>
                                                Save Changes
                                            </>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn-cancel"
                                        onClick={handleCancelEdit}
                                        disabled={updateLoading}
                                    >
                                        <span>✕</span>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="profile-section">
                                <div className="section-header">
                                    <h2>Personal Information</h2>
                                    <button className="btn-edit" onClick={() => setEditing(true)}>
                                        <span>✏️</span>
                                        Edit Profile
                                    </button>
                                </div>
                                <div className="info-grid">
                                    <InfoItem label="First Name" value={profile?.first_name} />
                                    <InfoItem label="Last Name" value={profile?.last_name} />
                                    <InfoItem label="Age" value={profile?.age} />
                                    <InfoItem label="Email" value={profile?.email} fullWidth />
                                </div>
                            </div>
                        )}

                        {stats && (
                            <div className="profile-section">
                                <h2>Account Statistics</h2>
                                <div className="info-grid">
                                    <InfoItem
                                        label="Account Age"
                                        value={stats.accountAge + " days"}
                                    />
                                    <InfoItem
                                        label="Member Since"
                                        value={new Date(stats.memberSince).toLocaleDateString()}
                                    />
                                    <InfoItem
                                        label="Last Updated"
                                        value={new Date(stats.lastUpdated).toLocaleDateString()}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="profile-section">
                            <PasswordChangeForm
                                onSubmit={handlePasswordChange}
                                loading={passwordLoading}
                                error={passwordError}
                                success={passwordSuccess}
                            />
                        </div>

                        <div className="profile-section">
                            <h2>Account Details</h2>
                            <InfoItem label="User ID" value={profile?.id} className="user-id" />
                        </div>
                    </div>
                </div>
            </div>
        </PageState>
    );
};

export default Profile;
