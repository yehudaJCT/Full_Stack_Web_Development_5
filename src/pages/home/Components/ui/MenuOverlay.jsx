import React from "react";

const MenuOverlay = ({ isVisible, onClose }) => {
	if (!isVisible) return null;

	return (
		<div
			className="position-fixed w-100 h-100"
			style={{
				top: 0,
				left: 0,
				zIndex: 999,
				backgroundColor: "transparent",
			}}
			onClick={onClose}
		></div>
	);
};

export default MenuOverlay;
