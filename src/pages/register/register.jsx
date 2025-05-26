import React, { useState } from "react";
import { getAll } from "../../utils/dbUtil";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		// Clear error when user starts typing
		if (error) setError("");
	};

	const validateForm = () => {
		if (!formData.username.trim()) {
			setError("Username is required.");
			return false;
		}

		if (formData.password.length < 6) {
			setError("Password must be at least 6 characters long.");
			return false;
		}

		if (formData.password !== formData.confirmPassword) {
			setError("Passwords do not match.");
			return false;
		}

		return true;
	};

	const checkUsernameExists = async (username) => {
		try {
			const users = await getAll("users");
			return users.some(
				(user) => user.username.toLowerCase() === username.toLowerCase()
			);
		} catch (err) {
			throw new Error("Error checking username availability");
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);
		setError("");

		try {
			const usernameExists = await checkUsernameExists(formData.username);

			if (usernameExists) {
				setError("Username already exists. Please choose another one.");
				return;
			}

			// Store basic registration data for the next step
			sessionStorage.setItem(
				"registrationData",
				JSON.stringify({
					username: formData.username.trim(),
					password: formData.password,
				})
			);

			// Navigate to complete profile page
			navigate("/complete-profile");
		} catch (err) {
			setError(err.message || "Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								Create Account
							</h3>

							<form onSubmit={handleSubmit} noValidate>
								{/* Username Field */}
								<div className="mb-3">
									<label
										htmlFor="username"
										className="form-label"
									>
										Username *
									</label>
									<input
										type="text"
										className="form-control"
										id="username"
										name="username"
										value={formData.username}
										onChange={handleInputChange}
										placeholder="Enter your username"
										required
										disabled={isLoading}
										minLength="3"
									/>
								</div>

								{/* Password Field */}
								<div className="mb-3">
									<label
										htmlFor="password"
										className="form-label"
									>
										Password *
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										name="password"
										value={formData.password}
										onChange={handleInputChange}
										placeholder="Enter your password"
										required
										disabled={isLoading}
										minLength="6"
									/>
									<small className="form-text text-muted">
										Password must be at least 6 characters
										long
									</small>
								</div>

								{/* Confirm Password Field */}
								<div className="mb-3">
									<label
										htmlFor="confirmPassword"
										className="form-label"
									>
										Confirm Password *
									</label>
									<input
										type="password"
										className="form-control"
										id="confirmPassword"
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										placeholder="Confirm your password"
										required
										disabled={isLoading}
									/>
								</div>

								{/* Error Message */}
								{error && (
									<div
										className="alert alert-danger"
										role="alert"
									>
										<i className="bi bi-exclamation-triangle me-2"></i>
										{error}
									</div>
								)}

								{/* Submit Button */}
								<button
									type="submit"
									className="btn btn-primary w-100"
									disabled={isLoading}
								>
									{isLoading ? (
										<>
											<span
												className="spinner-border spinner-border-sm me-2"
												role="status"
											></span>
											Creating Account...
										</>
									) : (
										"Continue"
									)}
								</button>
							</form>

							<div className="text-center mt-3">
								<small className="text-muted">
									Already have an account?
									<button
										type="button"
										className="btn btn-link text-decoration-none ms-1 p-0 align-baseline"
										style={{ fontSize: "inherit" }}
										onClick={() => navigate("/login")}
										disabled={isLoading}
									>
										Sign in
									</button>
								</small>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
