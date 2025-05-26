import React from "react";
import PersonalInfoSection from "./PersonalInfoSection";
import AddressInfoSection from "./AddressInfoSection";
import CompanyInfoSection from "./CompanyInfoSection";
import ErrorAlert from "../ui/ErrorAlert";

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

			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				{showBackButton && (
					<button
						type="button"
						className="btn btn-outline-secondary me-md-2"
						onClick={onBack}
						disabled={isLoading}
					>
						{backButtonText}
					</button>
				)}
				<button
					type="submit"
					className="btn btn-primary"
					disabled={isLoading}
				>
					{isLoading ? (
						<>
							<span
								className="spinner-border spinner-border-sm me-2"
								role="status"
							></span>
							{loadingText}
						</>
					) : (
						submitText
					)}
				</button>
			</div>
		</form>
	);
};

export default ProfileForm;
