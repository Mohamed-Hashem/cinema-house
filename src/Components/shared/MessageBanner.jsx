import React from "react";

const MessageBanner = ({ type, message, icon }) => {
    if (!message) return null;

    const defaultIcons = {
        success: "✓",
        error: "⚠",
        info: "ℹ",
    };

    return (
        <div className={`${type}-message`}>
            <span>{icon || defaultIcons[type]}</span> {message}
        </div>
    );
};

export default MessageBanner;
