import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, removeCurrentUser } from "../../../utils/users";
import ProfileAvatar from "./profile/ProfileAvatar";
import ProfileMenu from "./profile/ProfileMenu";
import NavigationTabs from "./navigation/NavigationTabs";
import MenuOverlay from "./ui/MenuOverlay";

const Sidebar = ({ activeTab, setActiveTab }) => {
	const navigate = useNavigate();
	const currentUser = getCurrentUser();
	const [showProfileMenu, setShowProfileMenu] = useState(false);

	const handleLogout = () => {
		removeCurrentUser();
		navigate("/login");
	};

	const handleViewProfile = () => {
		setShowProfileMenu(false);
		navigate("/profile");
	};

	const handleEditProfile = () => {
		setShowProfileMenu(false);
		navigate("/profile/edit");
	};

	const toggleProfileMenu = () => {
		setShowProfileMenu(!showProfileMenu);
	};

	const handleMenuClose = () => {
		setShowProfileMenu(false);
	};

	return (
		<>
			<div
				className="col-3 col-md-2 bg-light border-end d-flex flex-column p-3"
				style={{ minWidth: 220 }}
			>
				<ProfileAvatar
					currentUser={currentUser}
					showProfileMenu={showProfileMenu}
					onToggleMenu={toggleProfileMenu}
				/>

				{showProfileMenu && (
					<ProfileMenu
						onViewProfile={handleViewProfile}
						onEditProfile={handleEditProfile}
						onLogout={handleLogout}
					/>
				)}

				<NavigationTabs
					activeTab={activeTab}
					setActiveTab={setActiveTab}
				/>
			</div>

			<MenuOverlay
				isVisible={showProfileMenu}
				onClose={handleMenuClose}
			/>
		</>
	);
};

export default Sidebar;
