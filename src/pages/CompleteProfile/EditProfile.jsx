import React, { useEffect } from "react";
import ProfileForm from "./profile/ProfileForm";
import { useProfileForm } from "../hooks/useProfileForm";
import { getCurrentUser } from "../utils/users";
import { getAll } from "../utils/dbUtil";

const EditProfile = () => {
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
	}, [setProfileData, setError]);

	const handleEditSubmit = (e) => {
		const currentUser = getCurrentUser();
		handleSubmit(e, currentUser?.userId);
	};

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								Edit Profile
							</h3>

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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditProfile;
