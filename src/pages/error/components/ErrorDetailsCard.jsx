import React from "react";

const ErrorDetailsCard = ({
	icon = "🔍",
	message = "The requested URL was not found on this server.",
}) => {
	return (
		<div
			className="alert alert-light mb-4"
			style={{
				borderRadius: "12px",
				backgroundColor: "#f8f9fa",
				border: "1px solid #e9ecef",
			}}
		>
			<div className="d-flex align-items-center justify-content-center">
				<span className="me-2" style={{ fontSize: "1.2rem" }}>
					{icon}
				</span>
				<small className="text-muted">{message}</small>
			</div>
		</div>
	);
};

export default ErrorDetailsCard;
