import React from "react";

const ProfileMenuSection = ({ title, children, showBorder = false }) => {
	return (
		<>
			{showBorder && <div className="border-top mt-1"></div>}
			<div className="px-3 py-2 border-bottom">
				<small className="text-muted fw-semibold">{title}</small>
			</div>
			{children}
		</>
	);
};

export default ProfileMenuSection;
