import React, { useState } from "react";
import { getAll } from "../utils/dbUtil";
import { useNavigate } from "react-router-dom";

const Register = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (form.password !== form.confirmPassword) {
			setError("Passwords do not match.");
			return;
		}
		setLoading(true);
		try {
			const users = await getAll("users");
			const exists = users.some(
				(user) =>
					user.username.toLowerCase() === form.username.toLowerCase()
			);
			if (exists) {
				setError("Username already exists.");
				setLoading(false);
				return;
			}
			// Submit registration logic here
			alert("Registered successfully!");
            navigate("/complete-profile");
		} catch (err) {
			setError("Error checking username. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								Register
							</h3>
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label
										htmlFor="username"
										className="form-label"
									>
										Username
									</label>
									<input
										type="text"
										className="form-control"
										id="username"
										name="username"
										value={form.username}
										onChange={handleChange}
										required
										disabled={loading}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="password"
										className="form-label"
									>
										Password
									</label>
									<input
										type="password"
										className="form-control"
										id="password"
										name="password"
										value={form.password}
										onChange={handleChange}
										required
										disabled={loading}
									/>
								</div>
								<div className="mb-3">
									<label
										htmlFor="confirmPassword"
										className="form-label"
									>
										Confirm Password
									</label>
									<input
										type="password"
										className="form-control"
										id="confirmPassword"
										name="confirmPassword"
										value={form.confirmPassword}
										onChange={handleChange}
										required
										disabled={loading}
									/>
								</div>
								{error && (
									<div
										className="alert alert-danger"
										role="alert"
									>
										{error}
									</div>
								)}
								<button
									type="submit"
									className="btn btn-primary w-100"
									disabled={loading}
								>
									{loading ? "Registering..." : "Register"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
