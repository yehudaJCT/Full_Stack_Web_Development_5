import React from "react";

const ErrorAlert = ({ message }) => {
	if (!message) return null;

	return (
		<div
			className="alert alert-danger d-flex align-items-center mb-4"
			style={{
				borderRadius: "12px",
				border: "none",
				backgroundColor: "#fee2e2",
				color: "#dc2626",
				padding: "12px 16px",
				fontSize: "14px",
			}}
		>
			<div
				className="d-inline-flex align-items-center justify-content-center rounded-circle me-3"
				style={{
					width: "24px",
					height: "24px",
					backgroundColor: "#fca5a5",
					color: "#dc2626",
					fontSize: "12px",
				}}
			>
				⚠
			</div>
			<span>{message}</span>
		</div>
	);
};

export default ErrorAlert;
