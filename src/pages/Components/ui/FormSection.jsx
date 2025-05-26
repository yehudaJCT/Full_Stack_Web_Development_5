import React from "react";

const FormSection = ({ title, children, className = "mb-4" }) => {
	return (
		<div className={className}>
			{title && <h5 className="text-primary mb-3">{title}</h5>}
			{children}
		</div>
	);
};

export default FormSection;
