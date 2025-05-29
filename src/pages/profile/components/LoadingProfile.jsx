import React from "react";
import AuthCard from "../../Components/ui/AuthCard";

const LoadingProfile = () => (
	<AuthCard title="My Profile" className="col-md-8 col-lg-6">
		<div className="text-center py-5">
			<div className="spinner-border text-primary mb-3" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
			<p className="text-muted">Loading your profile...</p>
		</div>
	</AuthCard>
);

export default LoadingProfile;
