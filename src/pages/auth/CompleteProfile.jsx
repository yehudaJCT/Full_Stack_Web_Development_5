import React from "react";
import AuthCard from "../Components/ui/AuthCard";
import ProfileForm from "../Components/profile/ProfileForm";
import { useProfileForm } from "../../hooks/useProfile";

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
		<AuthCard title="Complete Your Profile" className="col-md-8 col-lg-6">
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
		</AuthCard>
	);
};

export default CompleteProfile;
