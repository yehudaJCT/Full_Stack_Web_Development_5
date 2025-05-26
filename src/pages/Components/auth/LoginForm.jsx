import React from "react";
import FormInput from "../ui/FormInput";
import ErrorAlert from "../ui/ErrorAlert";
import LoadingButton from "../ui/LoadingButton";

const LoginForm = ({
	formData,
	error,
	isLoading,
	onInputChange,
	onSubmit,
	onNavigateToRegister,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<FormInput
				label="Username"
				name="username"
				value={formData.username}
				onChange={onInputChange}
				placeholder="Enter your username"
				required
				disabled={isLoading}
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
			/>

			<ErrorAlert message={error} />

			<LoadingButton isLoading={isLoading} loadingText="Signing in...">
				Login
			</LoadingButton>

			<div className="text-center mt-3">
				<small className="text-muted">
					Don't have an account?
					<button
						type="button"
						className="btn btn-link text-decoration-none ms-1 p-0 align-baseline"
						style={{ fontSize: "inherit" }}
						onClick={onNavigateToRegister}
						disabled={isLoading}
					>
						Sign up
					</button>
				</small>
			</div>
		</form>
	);
};

export default LoginForm;
