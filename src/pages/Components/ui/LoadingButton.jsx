import React from "react";

const LoadingButton = ({
	isLoading,
	loadingText,
	children,
	className = "btn btn-primary w-100",
	type = "submit",
	...props
}) => {
	return (
		<button
			type={type}
			className={className}
			disabled={isLoading}
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
