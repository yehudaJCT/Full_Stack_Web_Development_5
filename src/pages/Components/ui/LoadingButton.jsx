import React from "react";

const LoadingButton = ({
	isLoading,
	loadingText,
	children,
	className = "btn btn-primary w-100",
	type = "submit",
	...props
}) => {
	const isPrimary = className.includes("btn-primary");
	const isOutline = className.includes("btn-outline");

	const buttonStyle = {
		borderRadius: "12px",
		padding: "12px 20px",
		fontSize: "15px",
		fontWeight: "600",
		transition: "all 0.3s ease",
		transform: "translateY(0)",
		border: isPrimary
			? "none"
			: isOutline
			? "2px solid #667eea"
			: "2px solid #6c757d",
		background: isPrimary
			? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
			: isOutline
			? "transparent"
			: "#6c757d",
		color: isPrimary || !isOutline ? "white" : "#667eea",
	};

	const handleMouseEnter = (e) => {
		if (!isLoading && !props.disabled) {
			e.target.style.transform = "translateY(-2px)";
			if (isPrimary) {
				e.target.style.boxShadow =
					"0 8px 25px rgba(102, 126, 234, 0.4)";
			} else if (isOutline) {
				e.target.style.backgroundColor = "#667eea";
				e.target.style.color = "white";
			} else {
				e.target.style.boxShadow =
					"0 4px 15px rgba(108, 117, 125, 0.3)";
			}
		}
	};

	const handleMouseLeave = (e) => {
		e.target.style.transform = "translateY(0)";
		e.target.style.boxShadow = "none";
		if (isOutline && !isLoading && !props.disabled) {
			e.target.style.backgroundColor = "transparent";
			e.target.style.color = "#667eea";
		}
	};

	return (
		<button
			type={type}
			className={className}
			disabled={isLoading || props.disabled}
			style={buttonStyle}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			{...props}
		>
			{isLoading ? (
				<>
					<span
						className="spinner-border spinner-border-sm me-2"
						role="status"
					></span>
					{loadingText}
				</>
			) : (
				children
			)}
		</button>
	);
};

export default LoadingButton;
