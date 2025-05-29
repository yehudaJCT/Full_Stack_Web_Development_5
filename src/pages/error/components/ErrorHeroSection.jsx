import React from "react";

const ErrorHeroSection = ({
	errorCode = "404",
	emoji = "😞",
	title = "Oops! Page Not Found",
	description = "The page you're looking for seems to have wandered off into the digital void. Don't worry, it happens to the best of us!",
}) => {
	return (
		<div className="mb-4">
			<div
				className="display-1 fw-bold mb-3"
				style={{
					fontSize: "clamp(4rem, 15vw, 8rem)",
					background:
						"linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					backgroundClip: "text",
					lineHeight: "1",
				}}
			>
				{errorCode}
			</div>

			<div className="mb-3" style={{ fontSize: "4rem", opacity: "0.8" }}>
				{emoji}
			</div>

			<h2
				className="fw-bold text-dark mb-3"
				style={{ fontSize: "1.8rem" }}
			>
				{title}
			</h2>

			<p
				className="text-muted mb-4"
				style={{
					fontSize: "1.1rem",
					maxWidth: "400px",
					margin: "0 auto",
				}}
			>
				{description}
			</p>
		</div>
	);
};

export default ErrorHeroSection;
