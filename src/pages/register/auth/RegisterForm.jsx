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
				placeholder="Enter your username"
				required
				disabled={isLoading}
				minLength="3"
			/>

			<FormInput
				label="Password"
				type="password"
				name="password"
				value={formData.password}
				onChange={onInputChange}
				placeholder="Enter your password"
				required
				disabled={isLoading}
				minLength="6"
				helpText="Password must be at least 6 characters long"
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
			/>

			<ErrorAlert message={error} />

			<LoadingButton
				isLoading={isLoading}
				loadingText="Creating Account..."
			>
				Continue
			</LoadingButton>

			<div className="text-center mt-3">
				<small className="text-muted">
					Already have an account?
					<button
						type="button"
						className="btn btn-link text-decoration-none ms-1 p-0 align-baseline"
						style={{ fontSize: "inherit" }}
						onClick={onNavigateToLogin}
						disabled={isLoading}
					>
						Sign in
					</button>
				</small>
			</div>
		</form>
	);
};

export default RegisterForm;
