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
	...props
}) => {
	return (
		<div className="mb-3">
			<label htmlFor={name} className="form-label">
				{label} {required && "*"}
			</label>
			<input
				type={type}
				className="form-control"
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				required={required}
				disabled={disabled}
				minLength={minLength}
				{...props}
			/>
			{helpText && (
				<small className="form-text text-muted">{helpText}</small>
			)}
		</div>
	);
};

export default FormInput;