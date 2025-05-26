import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthCard from "../Components/ui/AuthCard";
import { getCurrentUser } from "../../utils/users";
import { getAll } from "../../utils/dbUtil";

const ViewProfile = () => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadUserData = async () => {
			try {
				const currentUser = getCurrentUser();
				if (!currentUser) return;

				const users = await getAll("users");
				const user = users.find((u) => u.id === currentUser.userId);
				setUserData(user);
			} catch (err) {
				console.error("Failed to load user data:", err);
			} finally {
				setLoading(false);
			}
		};

		loadUserData();
	}, []);

	if (loading) {
		return (
			<AuthCard title="Profile">
				<div className="text-center">Loading...</div>
			</AuthCard>
		);
	}

	if (!userData) {
		return (
			<AuthCard title="Profile">
				<div className="text-center">
					<p>Profile not found.</p>
					<Link to="/login" className="btn btn-primary">
						Login
					</Link>
				</div>
			</AuthCard>
		);
	}

	return (
		<AuthCard title="My Profile" className="col-md-8 col-lg-6">
			<div className="row">
				<div className="col-md-6 mb-3">
					<label className="form-label fw-bold">Name:</label>
					<p>{userData.name}</p>
				</div>
				<div className="col-md-6 mb-3">
					<label className="form-label fw-bold">Username:</label>
					<p>{userData.username}</p>
				</div>
				<div className="col-md-6 mb-3">
					<label className="form-label fw-bold">Email:</label>
					<p>{userData.email}</p>
				</div>
				<div className="col-md-6 mb-3">
					<label className="form-label fw-bold">Phone:</label>
					<p>{userData.phone || "Not provided"}</p>
				</div>
				<div className="col-md-12 mb-3">
					<label className="form-label fw-bold">Website:</label>
					<p>{userData.website || "Not provided"}</p>
				</div>

				{/* Address Section */}
				<div className="col-md-12 mb-3">
					<h6 className="text-primary">Address</h6>
					<p>
						{userData.address.street} {userData.address.suite}
						<br />
						{userData.address.city}, {userData.address.zipcode}
					</p>
				</div>

				{/* Company Section */}
				{userData.company.name && (
					<div className="col-md-12 mb-3">
						<h6 className="text-primary">Company</h6>
						<p>
							<strong>{userData.company.name}</strong>
							<br />
							{userData.company.catchPhrase}
							<br />
							<small className="text-muted">
								{userData.company.bs}
							</small>
						</p>
					</div>
				)}
			</div>

			<div className="d-grid gap-2 d-md-flex justify-content-md-end">
				<Link to="/profile/edit" className="btn btn-primary">
					Edit Profile
				</Link>
				<Link to="/home" className="btn btn-outline-secondary">
					Back to Home
				</Link>
			</div>
		</AuthCard>
	);
};

export default ViewProfile;
