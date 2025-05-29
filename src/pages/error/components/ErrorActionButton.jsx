import React from "react";

const ErrorActionButton = ({
	onClick,
	variant = "primary",
	children,
	icon,
	className = "",
}) => {
	const getButtonStyles = () => {
		const baseStyles = {
			borderRadius: "12px",
			padding: "12px 24px",
			fontSize: "15px",
			fontWeight: "600",
			transition: "all 0.3s ease",
			minWidth: "140px",
		};

		switch (variant) {
			case "outline":
				return {
					...baseStyles,
					border: "2px solid #6c757d",
				};
			case "primary":
			default:
				return {
					...baseStyles,
					background:
						"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					border: "none",
				};
		}
	};

	const handleMouseEnter = (e) => {
		e.target.style.transform = "translateY(-2px)";
		if (variant === "primary") {
			e.target.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.4)";
		} else {
			e.target.style.boxShadow = "0 4px 15px rgba(108, 117, 125, 0.3)";
		}
	};

	const handleMouseLeave = (e) => {
		e.target.style.transform = "translateY(0)";
		e.target.style.boxShadow = "none";
	};

	const buttonClass =
		variant === "primary" ? "btn btn-primary" : "btn btn-outline-secondary";

	return (
		<button
			onClick={onClick}
			className={`${buttonClass} ${className}`}
			style={getButtonStyles()}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			{icon && <span className="me-1">{icon}</span>}
			{children}
		</button>
	);
};

export default ErrorActionButton;
