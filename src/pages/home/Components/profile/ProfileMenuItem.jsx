import React from "react";

const ProfileMenuItem = ({ icon, text, onClick, variant = "default" }) => {
	const getVariantStyles = () => {
		switch (variant) {
			case "danger":
				return {
					color: "#dc3545",
					hoverBg: "#fef2f2",
				};
			default:
				return {
					color: "#343a40",
					hoverBg: "#f8f9fa",
				};
		}
	};

	const styles = getVariantStyles();

	return (
		<button
			className="btn btn-link w-100 text-start px-3 py-2 text-decoration-none"
			onClick={onClick}
			style={{
				borderRadius: "0",
				transition: "background-color 0.2s ease",
				color: styles.color,
			}}
			onMouseEnter={(e) =>
				(e.target.style.backgroundColor = styles.hoverBg)
			}
			onMouseLeave={(e) =>
				(e.target.style.backgroundColor = "transparent")
			}
		>
			<span className="me-2">{icon}</span>
			{text}
		</button>
	);
};

export default ProfileMenuItem;
