import React from "react";
import RegisterForm from "./auth/RegisterForm";
import { useRegistration } from "./hooks/useRegistration";

const Register = () => {
	const {
		formData,
		error,
		isLoading,
		handleInputChange,
		handleSubmit,
		handleNavigateToLogin,
	} = useRegistration();

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								Create Account
							</h3>

							<RegisterForm
								formData={formData}
								error={error}
								isLoading={isLoading}
								onInputChange={handleInputChange}
								onSubmit={handleSubmit}
								onNavigateToLogin={handleNavigateToLogin}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
