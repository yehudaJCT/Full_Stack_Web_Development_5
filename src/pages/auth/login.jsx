import React from "react";
import AuthCard from "../Components/ui/AuthCard";
import LoginForm from "../Components/auth/LoginForm";
import { useLogin } from "../../hooks/useAuth";

const Login = () => {
	const {
		formData,
		error,
		isLoading,
		handleInputChange,
		handleSubmit,
		navigateToRegister,
	} = useLogin();

	return (
		<AuthCard title="Login">
			<LoginForm
				formData={formData}
				error={error}
				isLoading={isLoading}
				onInputChange={handleInputChange}
				onSubmit={handleSubmit}
				onNavigateToRegister={navigateToRegister}
			/>
		</AuthCard>
	);
};

export default Login;
