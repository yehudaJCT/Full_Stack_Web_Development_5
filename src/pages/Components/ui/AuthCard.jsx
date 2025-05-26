import React from "react";

const AuthCard = ({ title, children, className = "col-md-6 col-lg-5" }) => {
	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className={className}>
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								{title}
							</h3>
							{children}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthCard;
