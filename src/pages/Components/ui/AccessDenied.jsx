import React, { useState, useEffect } from "react";

const AccessDenied = ({ error, onRedirect }) => {
	const [countdown, setCountdown] = useState(2);

	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [countdown]);

	return (
		<div
			className="min-vh-100 d-flex align-items-center justify-content-center"
			style={{
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			}}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-6 col-lg-5">
						<div
							className="card border-0 shadow-lg"
							style={{
								borderRadius: "20px",
								background: "rgba(255, 255, 255, 0.95)",
							}}
						>
							<div className="card-body p-5 text-center">
								<div className="mb-4">
									<div
										className="d-inline-flex align-items-center justify-content-center rounded-circle text-white mb-3"
										style={{
											width: "70px",
											height: "70px",
											fontSize: "28px",
											background:
												"linear-gradient(135deg, #dc3545 0%, #c82333 100%)",
										}}
									>
										🚫
									</div>
									<h2 className="fw-bold text-dark mb-2">
										Access Forbidden
									</h2>
								</div>

								<div
									className="alert alert-danger"
									style={{ borderRadius: "12px" }}
								>
									<strong>
										⚠️ Unauthorized Access Attempt
									</strong>
									<p className="mb-0 mt-2">{error}</p>
								</div>

								<div className="mt-4">
									<p className="text-muted mb-3">
										You will be redirected to your own data
										in{" "}
										<strong className="text-primary">
											{countdown}
										</strong>{" "}
										second{countdown !== 1 ? "s" : ""}...
									</p>

									<div
										className="progress mb-3"
										style={{
											height: "6px",
											borderRadius: "3px",
										}}
									>
										<div
											className="progress-bar bg-primary"
											style={{
												width: `${
													((2 - countdown) / 2) * 100
												}%`,
												transition: "width 1s ease",
											}}
										></div>
									</div>

									<button
										className="btn btn-primary"
										onClick={onRedirect}
										style={{
											borderRadius: "12px",
											padding: "10px 24px",
											fontWeight: "600",
											background:
												"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
											border: "none",
										}}
									>
										Go to My Data Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccessDenied;
