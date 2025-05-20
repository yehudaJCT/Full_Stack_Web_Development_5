import React, { useState } from "react";

const Login = () => {
	const [form, setForm] = useState({ name: "", password: "" });
	const [error, setError] = useState("");

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
		// TODO: yp
		users = (async () => await fetch("http://localhost:3000/users"))();
		if (
			!users.some(
				(user) =>
					user.name === form.name && user.website === form.password
			)
		) {
			setError("Invalid username or password.");
			return;
		}
		alert("Logged in!");
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
					<label>Email:</label>
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
