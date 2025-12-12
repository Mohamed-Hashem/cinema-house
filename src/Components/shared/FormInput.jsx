import React from "react";

const FormInput = ({ label, name, value, onChange, error, type = "text", ...props }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>
                {label} {props.required && "*"}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                className={error ? "error" : ""}
                {...props}
            />
            {error && <span className="error-text">{error}</span>}
        </div>
    );
};

export default FormInput;
