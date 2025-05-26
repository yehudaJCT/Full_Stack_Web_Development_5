import React from "react";
import FormSection from "../ui/FormSection";
import FormInput from "../ui/FormInput";
import FormRow from "../ui/FormRow";
import FormCol from "../ui/FormCol";

const PersonalInfoSection = ({ profileData, isLoading, onChange }) => {
	return (
		<FormSection title="Personal Information">
			<FormInput
				label="Full Name"
				name="name"
				value={profileData.name}
				onChange={onChange}
				placeholder="Enter your full name"
				required
				disabled={isLoading}
			/>

			<FormInput
				label="Email Address"
				type="email"
				name="email"
				value={profileData.email}
				onChange={onChange}
				placeholder="Enter your email address"
				required
				disabled={isLoading}
			/>

			<FormRow>
				<FormCol size="6">
					<FormInput
						label="Phone Number"
						type="tel"
						name="phone"
						value={profileData.phone}
						onChange={onChange}
						placeholder="Enter your phone number"
						disabled={isLoading}
					/>
				</FormCol>
				<FormCol size="6">
					<FormInput
						label="Website"
						type="url"
						name="website"
						value={profileData.website}
						onChange={onChange}
						placeholder="Enter your website URL"
						required
						disabled={isLoading}
					/>
				</FormCol>
			</FormRow>
		</FormSection>
	);
};

export default PersonalInfoSection;
