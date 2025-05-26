import React from "react";
import ProfileForm from "./profile/ProfileForm";
import { useProfileForm } from "./hooks/useProfileForm";

const CompleteProfile = () => {
	const {
		profileData,
		error,
		isLoading,
		handleInputChange,
		handleSubmit,
		handleBack,
	} = useProfileForm("create");

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								Complete Your Profile
							</h3>

							<ProfileForm
								profileData={profileData}
								error={error}
								isLoading={isLoading}
								onInputChange={handleInputChange}
								onSubmit={handleSubmit}
								onBack={handleBack}
								submitText="Complete Registration"
								loadingText="Completing Registration..."
								backButtonText="Back"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompleteProfile;
