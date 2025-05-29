import React from "react";

const InfoCard = ({ icon, title, children, className = "" }) => (
	<div className={`${className} mb-4`}>
		<div
			className="card border-0 h-100"
			style={{
				borderRadius: "16px",
				backgroundColor: "#f8fafc",
				border: "1px solid #e2e8f0",
			}}
		>
			<div className="card-body p-4">
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
						{icon}
					</div>
					<h6 className="fw-bold text-dark mb-0">{title}</h6>
				</div>
				{children}
			</div>
		</div>
	</div>
);

export default InfoCard;
