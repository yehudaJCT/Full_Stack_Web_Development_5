import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll } from "../utils/dbUtil";
import { saveCurrentUser } from "../utils/users";

const Login = () => {
	const [form, setForm] = useState({ name: "", password: "" });
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
		// Dummy validation
		if (!form.name || !form.password) {
			setError("Please fill in all fields.");
			return;
		}

		if (!users.some((user) => user.name === form.name)) {
			setError("User not found.");
			return;
		}
		if (
			!users.some(
				(user) =>
					user.name === form.name && user.website === form.password
			)
		) {
			setError("Invalid username or password.");
			return;
		}
		const user = users.find(
			(user) => user.name === form.name && user.website === form.password
		);
		const userId = user ? user.id : null;
		saveCurrentUser(JSON.stringify({ userId: userId, name: form.name }));
		navigate("/home");
	};

	return (
		<div
			style={{
				maxWidth: 400,
				margin: "40px auto",
				padding: 24,
				border: "1px solid #ccc",
				borderRadius: 8,
			}}
		>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<div style={{ marginBottom: 16 }}>
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={form.name}
						onChange={handleChange}
						style={{ width: "100%", padding: 8, marginTop: 4 }}
						required
					/>
				</div>
				<div style={{ marginBottom: 16 }}>
					<label>Password:</label>
					<input
						type="password"
						name="password"
						value={form.password}
						onChange={handleChange}
						style={{ width: "100%", padding: 8, marginTop: 4 }}
						required
					/>
				</div>
				{error && (
					<div style={{ color: "red", marginBottom: 12 }}>
						{error}
					</div>
				)}
				<button type="submit" style={{ width: "100%", padding: 10 }}>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
