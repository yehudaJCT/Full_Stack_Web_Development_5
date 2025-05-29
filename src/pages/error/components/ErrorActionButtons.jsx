import React from "react";
import ErrorActionButton from "./ErrorActionButton";

const ErrorActionButtons = ({ onGoBack, onGoHome, currentUser }) => {
	return (
		<div className="d-grid gap-3 d-md-flex justify-content-md-center">
			<ErrorActionButton onClick={onGoBack} variant="outline" icon="←">
				Go Back
			</ErrorActionButton>

			<ErrorActionButton onClick={onGoHome} variant="primary" icon="🏠">
				{currentUser ? "Go Home" : "Go to Homepage"}
			</ErrorActionButton>
		</div>
	);
};

export default ErrorActionButtons;
