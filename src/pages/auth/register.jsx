import React from "react";
import AuthCard from "../Components/ui/AuthCard";
import RegisterForm from "../Components/auth/RegisterForm";
import { useRegistration } from "../../hooks/useAuth";

const Register = () => {
	const {
		formData,
		error,
		isLoading,
		handleInputChange,
		handleSubmit,
		navigateToLogin,
	} = useRegistration();

	return (
		<AuthCard title="Create Account">
			<RegisterForm
				formData={formData}
				error={error}
				isLoading={isLoading}
				onInputChange={handleInputChange}
				onSubmit={handleSubmit}
				onNavigateToLogin={navigateToLogin}
			/>
		</AuthCard>
	);
};

export default Register;
