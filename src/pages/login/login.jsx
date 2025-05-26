import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../../utils/dbUtil";
import { saveCurrentUser } from "../../utils/users";

const Login = () => {
	const [form, setForm] = useState({ username: "", password: "" });
	const [error, setError] = useState("");
	const [users, setUsers] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getAll("users")
			.then((data) => setUsers(data))
			.catch((err) => setError(err.message));
	}, []);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
		setError("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!form.username || !form.password) {
			setError("Please fill in all fields.");
			return;
		}

		const matchedUser = users.find(
			(user) =>
				user.username === form.username &&
				user.website === form.password
		);

		if (!users.some((user) => user.username === form.username)) {
			setError("User not found.");
			return;
		}

		if (!matchedUser) {
			setError("Invalid password.");
			return;
		}

		const userId = matchedUser.id;
		const name = matchedUser.name;

		saveCurrentUser(
			{
				userId: userId,
				name: name,
				username: form.username,
			}
		);
		navigate("/home");
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								Login
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
										id="username"
										name="username"
										className="form-control"
										value={form.username}
										onChange={handleChange}
										required
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
										id="password"
										name="password"
										className="form-control"
										value={form.password}
										onChange={handleChange}
										required
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
								>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
