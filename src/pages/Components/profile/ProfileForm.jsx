import React from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import AddressInfoSection from "./AddressInfoSection";
import CompanyInfoSection from "./CompanyInfoSection";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingButton from "../ui/LoadingButton";

const ProfileForm = ({
	profileData,
	error,
	isLoading,
	onInputChange,
	onSubmit,
	onBack,
	submitText = "Complete Registration",
	loadingText = "Completing Registration...",
	showBackButton = true,
	backButtonText = "Back",
}) => {
	return (
		<form onSubmit={onSubmit} noValidate>
			<PersonalInfoSection
				profileData={profileData}
				isLoading={isLoading}
				onChange={onInputChange}
			/>

			<AddressInfoSection
				profileData={profileData}
				isLoading={isLoading}
				onChange={onInputChange}
			/>

			<CompanyInfoSection
				profileData={profileData}
				isLoading={isLoading}
				onChange={onInputChange}
			/>

			<ErrorAlert message={error} />

			<div className="d-grid gap-3 d-md-flex justify-content-md-end mt-4">
				{showBackButton && (
					<LoadingButton
						type="button"
						className="btn btn-outline-secondary"
						onClick={onBack}
						isLoading={false}
						style={{ minWidth: "120px" }}
					>
						{backButtonText}
					</LoadingButton>
				)}
				<LoadingButton
					isLoading={isLoading}
					loadingText={loadingText}
					className="btn btn-primary"
					style={{ minWidth: "180px" }}
				>
					{submitText}
				</LoadingButton>
			</div>
		</form>
	);
};

export default ProfileForm;
