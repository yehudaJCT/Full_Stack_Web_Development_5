import React from "react";
import FormSection from "../ui/FormSection";
import FormInput from "../ui/FormInput";
import FormRow from "../ui/FormRow";
import FormCol from "../ui/FormCol";

const AddressInfoSection = ({ profileData, isLoading, onChange }) => {
	return (
		<FormSection title="Address Information">
			<FormRow>
				<FormCol size="8">
					<FormInput
						label="Street Address"
						name="address.street"
						value={profileData.address.street}
						onChange={onChange}
						placeholder="Enter street address"
						disabled={isLoading}
					/>
				</FormCol>
				<FormCol size="4">
					<FormInput
						label="Suite/Apt"
						name="address.suite"
						value={profileData.address.suite}
						onChange={onChange}
						placeholder="Suite/Apt"
						disabled={isLoading}
					/>
				</FormCol>
			</FormRow>

			<FormRow>
				<FormCol size="6">
					<FormInput
						label="City"
						name="address.city"
						value={profileData.address.city}
						onChange={onChange}
						placeholder="Enter city"
						disabled={isLoading}
					/>
				</FormCol>
				<FormCol size="6">
					<FormInput
						label="Zip Code"
						name="address.zipcode"
						value={profileData.address.zipcode}
						onChange={onChange}
						placeholder="Enter zip code"
						disabled={isLoading}
					/>
				</FormCol>
			</FormRow>

			<FormRow>
				<FormCol size="6">
					<FormInput
						label="Latitude"
						name="geo.lat"
						value={profileData.address.geo.lat}
						onChange={onChange}
						placeholder="Enter latitude"
						disabled={isLoading}
					/>
				</FormCol>
				<FormCol size="6">
					<FormInput
						label="Longitude"
						name="geo.lng"
						value={profileData.address.geo.lng}
						onChange={onChange}
						placeholder="Enter longitude"
						disabled={isLoading}
					/>
				</FormCol>
			</FormRow>
		</FormSection>
	);
};

export default AddressInfoSection;
