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

			<LoadingButton
				isLoading={isLoading}
				loadingText="Signing in..."
				className="btn btn-primary w-100 mb-4"
			>
				Sign In
			</LoadingButton>

			<div className="text-center">
				<p className="text-muted mb-0" style={{ fontSize: "14px" }}>
					Don't have an account?{" "}
					<button
						type="button"
						className="btn btn-link p-0 fw-semibold"
						style={{
							color: "#667eea",
							textDecoration: "none",
							fontSize: "inherit",
						}}
						onClick={onNavigateToRegister}
						disabled={isLoading}
						onMouseEnter={(e) =>
							(e.target.style.textDecoration = "underline")
						}
						onMouseLeave={(e) =>
							(e.target.style.textDecoration = "none")
						}
					>
						Sign up here
					</button>
				</p>
			</div>
		</form>
	);
};

export default LoginForm;
