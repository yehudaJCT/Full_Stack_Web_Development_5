import React from "react";

const AuthCard = ({ title, children, className = "col-md-6 col-lg-5" }) => {
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
					<div className={className}>
						<div
							className="card border-0 shadow-lg"
							style={{
								borderRadius: "20px",
								background: "rgba(255, 255, 255, 0.95)",
								backdropFilter: "blur(20px)",
								overflow: "hidden",
							}}
						>
							<div className="card-body p-5">
								{/* Header with Icon */}
								<div className="text-center mb-4">
									<div
										className="d-inline-flex align-items-center justify-content-center rounded-circle text-white mb-3"
										style={{
											width: "70px",
											height: "70px",
											fontSize: "28px",
											background:
												"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
											boxShadow:
												"0 8px 32px rgba(102, 126, 234, 0.3)",
										}}
									>
										{title.includes("Login")
											? "🔐"
											: title.includes("Register") ||
											  title.includes("Create")
											? "🚀"
											: title.includes("Profile")
											? "👤"
											: "✨"}
									</div>
									<h2
										className="fw-bold text-dark mb-2"
										style={{ fontSize: "1.8rem" }}
									>
										{title}
									</h2>
									<p
										className="text-muted mb-0"
										style={{ fontSize: "0.95rem" }}
									>
										{title.includes("Login")
											? "Welcome back! Please sign in to continue."
											: title.includes("Register") ||
											  title.includes("Create Account")
											? "Join us today and get started!"
											: title.includes("Complete")
											? "Just a few more details to get you started."
											: title.includes("Edit")
											? "Update your information below."
											: "Manage your account information."}
									</p>
								</div>

								{children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthCard;
