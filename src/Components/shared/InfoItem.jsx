import React from "react";

const InfoItem = ({ label, value, fullWidth = false, className = "" }) => {
    return (
        <div className={`info-item ${fullWidth ? "full-width" : ""} ${className}`}>
            <label>{label}</label>
            <p>{value || "Not set"}</p>
        </div>
    );
};

export default InfoItem;
