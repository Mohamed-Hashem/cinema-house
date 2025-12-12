import React, { memo } from "react";
import Loader from "react-loader-spinner";

const LoadingSpinner = memo(
    ({ height = 100, width = 100, color = "#00BFFF", type = "Bars", className = "Loader" }) => (
        <div className={className}>
            <Loader type={type} color={color} height={height} width={width} />
        </div>
    )
);

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
