import React from "react";

const FormInput = ({
	label,
	type = "text",
	name,
	value,
	onChange,
	placeholder,
	required = false,
	disabled = false,
	minLength,
	helpText,
	className = "form-control",
	...props
}) => {
	const inputStyle = {
		borderRadius: "12px",
		border: "2px solid #e9ecef",
		padding: "12px 16px",
		fontSize: "15px",
		transition: "all 0.3s ease",
		backgroundColor: disabled ? "#f8f9fa" : "white",
	};

	const handleFocus = (e) => {
		e.target.style.borderColor = "#667eea";
		e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
	};

	const handleBlur = (e) => {
		e.target.style.borderColor = "#e9ecef";
		e.target.style.boxShadow = "none";
	};

	return (
		<div className="mb-3">
			<label
				htmlFor={name}
				className="form-label fw-semibold text-dark"
				style={{ fontSize: "14px" }}
			>
				{label} {required && <span className="text-danger">*</span>}
			</label>

			{type === "textarea" ? (
				<textarea
					className={className}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					style={{
						...inputStyle,
						minHeight: "100px",
						resize: "vertical",
					}}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>
			) : (
				<input
					type={type}
					className={className}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					disabled={disabled}
					minLength={minLength}
					style={inputStyle}
					onFocus={handleFocus}
					onBlur={handleBlur}
					{...props}
				/>
			)}

			{helpText && (
				<small
					className="form-text text-muted d-block mt-1"
					style={{ fontSize: "12px" }}
				>
					{helpText}
				</small>
			)}
		</div>
	);
};

export default FormInput;
