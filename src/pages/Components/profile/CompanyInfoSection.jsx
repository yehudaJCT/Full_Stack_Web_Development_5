import React from "react";
import FormSection from "../ui/FormSection";
import FormInput from "../ui/FormInput";

const CompanyInfoSection = ({ profileData, isLoading, onChange }) => {
	return (
		<FormSection title="Company Information">
			<FormInput
				label="Company Name"
				name="company.name"
				value={profileData.company.name}
				onChange={onChange}
				placeholder="Enter company name"
				disabled={isLoading}
			/>

			<FormInput
				label="Company Catch Phrase"
				name="company.catchPhrase"
				value={profileData.company.catchPhrase}
				onChange={onChange}
				placeholder="Enter company catch phrase"
				disabled={isLoading}
			/>

			<FormInput
				label="Company Business"
				name="company.bs"
				value={profileData.company.bs}
				onChange={onChange}
				placeholder="Enter company business description"
				disabled={isLoading}
			/>
		</FormSection>
	);
};

export default CompanyInfoSection;
