import React from "react";
import ProfileMenuSection from "./ProfileMenuSection";
import ProfileMenuItem from "./ProfileMenuItem";

const ProfileMenu = ({ onViewProfile, onEditProfile, onLogout }) => {
	return (
		<div
			className="position-fixed bg-white border rounded shadow-lg"
			style={{
				top: "8px",
				left: "180px",
				zIndex: 1000,
				minWidth: "200px",
				padding: "8px 0",
				borderRadius: "12px",
				boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
			}}
		>
			{/* Arrow pointer */}
			<div
				style={{
					position: "absolute",
					top: "30px",
					left: "-8px",
					width: 0,
					height: 0,
					borderTop: "8px solid transparent",
					borderBottom: "8px solid transparent",
					borderRight: "8px solid white",
				}}
			></div>

			{/* Profile Section */}
			<ProfileMenuSection title="PROFILE">
				<ProfileMenuItem
					icon="👁️"
					text="View Profile"
					onClick={onViewProfile}
				/>
				<ProfileMenuItem
					icon="✏️"
					text="Edit Profile"
					onClick={onEditProfile}
				/>
			</ProfileMenuSection>

			{/* Account Section */}
			<ProfileMenuSection title="ACCOUNT" showBorder>
				<ProfileMenuItem
					icon="🚪"
					text="Logout"
					onClick={onLogout}
					variant="danger"
				/>
			</ProfileMenuSection>
		</div>
	);
};

export default ProfileMenu;
