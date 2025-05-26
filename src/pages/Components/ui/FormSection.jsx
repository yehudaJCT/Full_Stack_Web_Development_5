import React from "react";

const FormSection = ({ title, children, className = "mb-4" }) => {
	return (
		<div className={className}>
			{title && (
				<div className="d-flex align-items-center mb-3">
					<div
						className="d-inline-flex align-items-center justify-content-center rounded-circle me-3"
						style={{
							width: "32px",
							height: "32px",
							background:
								"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
							color: "white",
							fontSize: "14px",
						}}
					>
						{title.includes("Personal")
							? "👤"
							: title.includes("Address")
							? "🏠"
							: title.includes("Company")
							? "🏢"
							: "📝"}
					</div>
					<h5
						className="text-dark fw-bold mb-0"
						style={{
							fontSize: "1.1rem",
							color: "#334155",
						}}
					>
						{title}
					</h5>
				</div>
			)}
			<div
				className="p-4"
				style={{
					backgroundColor: "#f8fafc",
					borderRadius: "16px",
					border: "1px solid #e2e8f0",
				}}
			>
				{children}
			</div>
		</div>
	);
};

export default FormSection;
