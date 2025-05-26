import React from "react";

const ErrorAlert = ({ message }) => {
	if (!message) return null;

	return (
		<div className="alert alert-danger" role="alert">
			<i className="bi bi-exclamation-triangle me-2"></i>
			{message}
		</div>
	);
};

export default ErrorAlert;
