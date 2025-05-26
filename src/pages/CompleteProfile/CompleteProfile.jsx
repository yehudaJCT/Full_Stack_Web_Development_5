import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		website: "",
		address: {
			street: "",
			suite: "",
			city: "",
			zipcode: "",
		},
		company: {
			name: "",
			catchPhrase: "",
			bs: "",
		},
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;

		if (name.includes("address.")) {
			const field = name.split(".")[1];
			setForm((prev) => ({
				...prev,
				address: { ...prev.address, [field]: value },
			}));
		} else if (name.includes("company.")) {
			const field = name.split(".")[1];
			setForm((prev) => ({
				...prev,
				company: { ...prev.company, [field]: value },
			}));
		} else {
			setForm({ ...form, [name]: value });
		}
		setError("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		// Simple validation
		if (
			!form.name || !form.email || !form.phone || !form.website ||
			!form.address.street || !form.address.city || !form.address.zipcode ||
			!form.company.name
		) {
			setError("Please fill all required fields.");
			return;
		}

		setLoading(true);
		setTimeout(() => {
			console.log("User profile completed:", form);
			navigate("/home");
		}, 1000);
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-10 col-lg-8">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title text-center mb-4">Complete Your Profile</h3>
							<form onSubmit={handleSubmit}>
								<h5>Basic Info</h5>
								<div className="mb-3">
									<label className="form-label">Full Name</label>
									<input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label className="form-label">Email</label>
									<input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label className="form-label">Phone</label>
									<input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label className="form-label">Website</label>
									<input type="text" className="form-control" name="website" value={form.website} onChange={handleChange} />
								</div>

								<h5 className="mt-4">Address</h5>
								<div className="row">
									<div className="col-md-6 mb-3">
										<label className="form-label">Street</label>
										<input type="text" className="form-control" name="address.street" value={form.address.street} onChange={handleChange} />
									</div>
									<div className="col-md-6 mb-3">
										<label className="form-label">Suite</label>
										<input type="text" className="form-control" name="address.suite" value={form.address.suite} onChange={handleChange} />
									</div>
									<div className="col-md-6 mb-3">
										<label className="form-label">City</label>
										<input type="text" className="form-control" name="address.city" value={form.address.city} onChange={handleChange} />
									</div>
									<div className="col-md-6 mb-3">
										<label className="form-label">Zip Code</label>
										<input type="text" className="form-control" name="address.zipcode" value={form.address.zipcode} onChange={handleChange} />
									</div>
								</div>

								<h5 className="mt-4">Company</h5>
								<div className="mb-3">
									<label className="form-label">Company Name</label>
									<input type="text" className="form-control" name="company.name" value={form.company.name} onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label className="form-label">Catch Phrase</label>
									<input type="text" className="form-control" name="company.catchPhrase" value={form.company.catchPhrase} onChange={handleChange} />
								</div>
								<div className="mb-3">
									<label className="form-label">Business Strategy</label>
									<input type="text" className="form-control" name="company.bs" value={form.company.bs} onChange={handleChange} />
								</div>

								{error && <div className="alert alert-danger">{error}</div>}

								<button type="submit" className="btn btn-primary w-100" disabled={loading}>
									{loading ? "Saving..." : "Submit Profile"}
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompleteProfile;
