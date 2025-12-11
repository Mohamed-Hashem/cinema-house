import React, { memo } from "react";
import Loader from "react-loader-spinner";

/**
 * Reusable loading spinner component
 */
const LoadingSpinner = memo(function LoadingSpinner(props) {
    const spinnerHeight = props.height || 100;
    const spinnerWidth = props.width || 100;
    const spinnerColor = props.color || "#00BFFF";
    const spinnerType = props.type || "Bars";
    const containerClass = props.className || "Loader";

    return (
        <div className={containerClass}>
            <Loader
                type={spinnerType}
                color={spinnerColor}
                height={spinnerHeight}
                width={spinnerWidth}
            />
        </div>
    );
});

export default LoadingSpinner;
