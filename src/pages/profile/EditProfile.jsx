import React, { useEffect } from "react";
import AuthCard from "../Components/ui/AuthCard";
import ProfileForm from "../Components/profile/ProfileForm";
import { useProfileForm } from "../../hooks/useProfile";
import { getCurrentUser } from "../../utils/users";
import { getAll } from "../../utils/dbUtil";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
	const navigate = useNavigate();
	const {
		profileData,
		error,
		isLoading,
		handleInputChange,
		handleSubmit,
		handleBack,
		setProfileData,
		setError,
	} = useProfileForm("edit");

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const currentUser = getCurrentUser();
				if (!currentUser) {
					navigate("/login");
					return;
				}

				const users = await getAll("users");
				const userData = users.find((u) => u.id === currentUser.userId);

				if (userData) {
					setProfileData(userData);
				}
			} catch (err) {
				setError("Failed to load user data.");
				console.error("Load user data error:", err);
			}
		};

		loadUserData();
	}, [setProfileData, setError, navigate]);

	const handleEditSubmit = (e) => {
		const currentUser = getCurrentUser();
		handleSubmit(e, currentUser?.userId);
	};

	return (
		<AuthCard title="Edit Profile" className="col-md-8 col-lg-6">
			<ProfileForm
				profileData={profileData}
				error={error}
				isLoading={isLoading}
				onInputChange={handleInputChange}
				onSubmit={handleEditSubmit}
				onBack={handleBack}
				submitText="Update Profile"
				loadingText="Updating Profile..."
				backButtonText="Cancel"
			/>
		</AuthCard>
	);
};

export default EditProfile;
