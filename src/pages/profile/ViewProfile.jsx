import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../Components/ui/AuthCard";
import { getCurrentUser } from "../../utils/users";
import { getAll } from "../../utils/dbUtil";
import InfoCard from "./components/InfoCard";
import InfoItem from "./components/InfoItem";
import LoadingProfile from "./components/LoadingProfile";

const ViewProfile = () => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const currentUser = getCurrentUser();
				if (!currentUser) return;

				const users = await getAll("users");
				const user = users.find((u) => u.id === currentUser.userId);
				setUserData(user);
			} catch (err) {
				console.error("Failed to load user data:", err);
			} finally {
				setLoading(false);
			}
		};

		loadUserData();
	}, []);

	if (loading) {
		return <LoadingProfile />;
	}

	if (!userData) {
		return (
			<AuthCard title="Profile Not Found" className="col-md-6 col-lg-5">
				<div className="text-center py-4">
					<div
						className="d-inline-flex align-items-center justify-content-center rounded-circle bg-warning text-white mb-3"
						style={{
							width: "60px",
							height: "60px",
							fontSize: "24px",
						}}
					>
						⚠️
					</div>
					<p className="text-muted mb-4">
						We couldn't find your profile information.
					</p>
					<Link
						to="/login"
						className="btn btn-primary"
						style={{
							borderRadius: "12px",
							padding: "10px 24px",
							fontWeight: "600",
						}}
					>
						Sign In Again
					</Link>
				</div>
			</AuthCard>
		);
	}

	return (
		<AuthCard title="My Profile" className="col-md-10 col-lg-8">
			<div className="row">
				{/* Personal Information */}
				<InfoCard
					icon="👤"
					title="Personal Information"
					className="col-md-6"
				>
					<InfoItem label="Full Name" value={userData.name} />
					<InfoItem label="Username" value={userData.username} />
					<InfoItem label="Email Address" value={userData.email} />
					<InfoItem label="Phone Number" value={userData.phone} />
					<InfoItem
						label="Website"
						value={userData.website}
						isLink={true}
					/>
				</InfoCard>

				{/* Address Information */}
				<InfoCard
					icon="🏠"
					title="Address Information"
					className="col-md-6"
				>
					<InfoItem
						label="Street Address"
						value={`${userData.address.street} ${userData.address.suite}`.trim()}
					/>
					<InfoItem label="City" value={userData.address.city} />
					<InfoItem
						label="Zip Code"
						value={userData.address.zipcode}
					/>
					<InfoItem
						label="Coordinates"
						value={
							userData.address.geo.lat && userData.address.geo.lng
								? `${userData.address.geo.lat}, ${userData.address.geo.lng}`
								: "Not provided"
						}
					/>
				</InfoCard>

				{/* Company Information */}
				{userData.company.name && (
					<InfoCard
						icon="🏢"
						title="Company Information"
						className="col-12"
					>
						<div className="row">
							<div className="col-md-4">
								<InfoItem
									label="Company Name"
									value={userData.company.name}
								/>
							</div>
							<div className="col-md-4">
								<InfoItem
									label="Catch Phrase"
									value={userData.company.catchPhrase}
								/>
							</div>
							<div className="col-md-4">
								<InfoItem
									label="Business"
									value={userData.company.bs}
								/>
							</div>
						</div>
					</InfoCard>
				)}
			</div>

			{/* Action Buttons */}
			<div className="d-grid gap-3 d-md-flex justify-content-md-end mt-4 pt-4 border-top">
				<Link
					to="/home"
					className="btn btn-outline-secondary"
					style={{
						borderRadius: "12px",
						padding: "10px 24px",
						fontWeight: "600",
						minWidth: "120px",
					}}
				>
					← Back to Home
				</Link>
				<Link
					to="/profile/edit"
					className="btn btn-primary"
					style={{
						borderRadius: "12px",
						padding: "10px 24px",
						fontWeight: "600",
						minWidth: "120px",
						background:
							"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						border: "none",
					}}
				>
					✏️ Edit Profile
				</Link>
			</div>
		</AuthCard>
	);
};

export default ViewProfile;
