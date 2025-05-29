import React from "react";

const ErrorPageLayout = ({ children }) => {
	return (
		<div
			className="min-vh-100 d-flex align-items-center"
			style={{
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				fontFamily: '"Inter", "Segoe UI", sans-serif',
			}}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<div
							className="card border-0 shadow-lg"
							style={{
								borderRadius: "20px",
								background: "rgba(255, 255, 255, 0.95)",
								backdropFilter: "blur(20px)",
								overflow: "hidden",
							}}
						>
							<div className="card-body p-5 text-center">
								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ErrorPageLayout;
