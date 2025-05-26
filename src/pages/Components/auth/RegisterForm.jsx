import React from "react";
import FormInput from "../ui/FormInput";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingButton from "../ui/LoadingButton";

const RegisterForm = ({
	formData,
	error,
	isLoading,
	onInputChange,
	onSubmit,
	onNavigateToLogin,
}) => {
	return (
		<form onSubmit={onSubmit} noValidate>
			<FormInput
				label="Username"
				name="username"
				value={formData.username}
				onChange={onInputChange}
				placeholder="Choose a unique username"
				required
				disabled={isLoading}
				minLength="3"
				helpText="Must be at least 3 characters long"
			/>

			<FormInput
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={onInputChange}
				placeholder="Create a secure password"
				required
				disabled={isLoading}
				minLength="6"
				helpText="Must be at least 6 characters long"
			/>

			<FormInput
				label="Confirm Password"
				type="password"
				name="confirmPassword"
				value={formData.confirmPassword}
				onChange={onInputChange}
				placeholder="Confirm your password"
				required
				disabled={isLoading}
				helpText="Please enter the same password again"
			/>

			<ErrorAlert message={error} />

			<LoadingButton
				isLoading={isLoading}
				loadingText="Creating Account..."
				className="btn btn-primary w-100 mb-4"
			>
				Create Account
			</LoadingButton>

			<div className="text-center">
				<p className="text-muted mb-0" style={{ fontSize: "14px" }}>
					Already have an account?{" "}
					<button
						type="button"
						className="btn btn-link p-0 fw-semibold"
						style={{
							color: "#667eea",
							textDecoration: "none",
							fontSize: "inherit",
						}}
						onClick={onNavigateToLogin}
						disabled={isLoading}
						onMouseEnter={(e) =>
							(e.target.style.textDecoration = "underline")
						}
						onMouseLeave={(e) =>
							(e.target.style.textDecoration = "none")
						}
					>
						Sign in here
					</button>
				</p>
			</div>
		</form>
	);
};

export default RegisterForm;
