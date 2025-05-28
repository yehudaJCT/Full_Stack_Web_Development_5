import React from "react";

const ProfileAvatar = ({ currentUser, showProfileMenu, onToggleMenu }) => {
	return (
		<div className="d-flex flex-column align-items-center mb-4 position-relative">
			<div className="position-relative">
				<div
					className="rounded-circle bg-secondary position-relative"
					style={{
						width: 60,
						height: 60,
						cursor: "pointer",
						transition: "all 0.3s ease",
						boxShadow: showProfileMenu
							? "0 0 0 3px rgba(102, 126, 234, 0.3)"
							: "none",
					}}
					onClick={onToggleMenu}
					onMouseEnter={(e) => {
						e.target.style.transform = "scale(1.05)";
						e.target.style.boxShadow =
							"0 4px 12px rgba(0,0,0,0.15)";
					}}
					onMouseLeave={(e) => {
						e.target.style.transform = "scale(1)";
						e.target.style.boxShadow = showProfileMenu
							? "0 0 0 3px rgba(102, 126, 234, 0.3)"
							: "none";
					}}
					title="Click to access profile options"
				>
					{/* Profile icon overlay */}
					<div
						className="d-flex align-items-center justify-content-center h-100 text-white"
						style={{ fontSize: "24px" }}
					>
						👤
					</div>
				</div>
			</div>
			<span className="mt-2 fw-bold">
				{(currentUser && currentUser.name) || "user name"}
			</span>
			<span className="text-muted" style={{ fontSize: 12 }}>
				__________
			</span>
		</div>
	);
};

export default ProfileAvatar;
