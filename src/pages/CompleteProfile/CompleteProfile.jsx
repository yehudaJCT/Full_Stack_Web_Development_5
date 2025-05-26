import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAll, create } from "../../utils/dbUtil";
import { saveCurrentUser } from "../../utils/users";

const CompleteProfile = () => {
	const [profileData, setProfileData] = useState({
		name: "",
		email: "",
		phone: "",
		website: "",
		address: {
			street: "",
			suite: "",
			city: "",
			zipcode: "",
			geo: {
				lat: "",
				lng: "",
			},
		},
		company: {
			name: "",
			catchPhrase: "",
			bs: "",
		},
	});

	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if user came from registration
		const registrationData = sessionStorage.getItem("registrationData");
		if (!registrationData) {
			navigate("/register");
		}
		const regObj = JSON.parse(registrationData);
		setProfileData((prev) => ({
			...prev,
			website: regObj.password || "",
		}));
	}, [navigate]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name.includes(".")) {
			// Handle nested object updates (address.street, company.name, etc.)
			const [parent, child] = name.split(".");
			setProfileData((prev) => ({
				...prev,
				[parent]: {
					...prev[parent],
					[child]: value,
				},
			}));
		} else if (name.includes("geo.")) {
			// Handle geo coordinates
			const geoField = name.split(".")[1];
			setProfileData((prev) => ({
				...prev,
				address: {
					...prev.address,
					geo: {
						...prev.address.geo,
						[geoField]: value,
					},
				},
			}));
		} else {
			setProfileData((prev) => ({
				...prev,
				[name]: value,
			}));
		}

		// Clear error when user starts typing
		if (error) setError("");
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const validateForm = () => {
		if (!profileData.name.trim()) {
			setError("Full name is required.");
			return false;
		}

		if (!profileData.email.trim()) {
			setError("Email is required.");
			return false;
		}

		if (!validateEmail(profileData.email)) {
			setError("Please enter a valid email address.");
			return false;
		}

		if (!profileData.website.trim()) {
			setError("Website is required. (Password Purpose)");
			return false;
		}

		return true;
	};

	const generateUserId = async () => {
		try {
			const users = await getAll("users");
			return users.length > 0
				? Math.max(...users.map((u) => parseInt(u.id))) + 1
				: 1;
		} catch (err) {
			return Date.now(); // Fallback to timestamp
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!validateForm()) return;

		setIsLoading(true);
		setError("");

		try {
			const registrationData = JSON.parse(
				sessionStorage.getItem("registrationData")
			);
			const userId = await generateUserId();

			const completeUser = {
				id: userId.toString(),
				username: registrationData.username,
				name: profileData.name.trim(),
				email: profileData.email.trim(),
				phone: profileData.phone.trim() || "",
				website: profileData.website.trim() || "",
				address: {
					street: profileData.address.street.trim() || "",
					suite: profileData.address.suite.trim() || "",
					city: profileData.address.city.trim() || "",
					zipcode: profileData.address.zipcode.trim() || "",
					geo: {
						lat: profileData.address.geo.lat.trim() || "0",
						lng: profileData.address.geo.lng.trim() || "0",
					},
				},
				company: {
					name: profileData.company.name.trim() || "",
					catchPhrase: profileData.company.catchPhrase.trim() || "",
					bs: profileData.company.bs.trim() || "",
				},
			};

			// Save user to database
			await create("users", completeUser);

			// Clear registration data
			sessionStorage.removeItem("registrationData");

			saveCurrentUser({
				userId: completeUser.id,
				name: completeUser.name,
				username: completeUser.username,
			});
			navigate("/home");
		} catch (err) {
			setError("Failed to complete registration. Please try again.");
			console.error("Registration error:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container mt-4">
			<div className="row justify-content-center">
				<div className="col-md-8 col-lg-6">
					<div className="card shadow-sm">
						<div className="card-body">
							<h3 className="card-title mb-4 text-center">
								Complete Your Profile
							</h3>

							<form onSubmit={handleSubmit} noValidate>
								{/* Personal Information */}
								<div className="mb-4">
									<h5 className="text-primary mb-3">
										Personal Information
									</h5>

									<div className="mb-3">
										<label
											htmlFor="name"
											className="form-label"
										>
											Full Name *
										</label>
										<input
											type="text"
											className="form-control"
											id="name"
											name="name"
											value={profileData.name}
											onChange={handleInputChange}
											placeholder="Enter your full name"
											required
											disabled={isLoading}
										/>
									</div>

									<div className="mb-3">
										<label
											htmlFor="email"
											className="form-label"
										>
											Email Address *
										</label>
										<input
											type="email"
											className="form-control"
											id="email"
											name="email"
											value={profileData.email}
											onChange={handleInputChange}
											placeholder="Enter your email address"
											required
											disabled={isLoading}
										/>
									</div>

									<div className="row">
										<div className="col-md-6 mb-3">
											<label
												htmlFor="phone"
												className="form-label"
											>
												Phone Number
											</label>
											<input
												type="tel"
												className="form-control"
												id="phone"
												name="phone"
												value={profileData.phone}
												onChange={handleInputChange}
												placeholder="Enter your phone number"
												disabled={isLoading}
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label
												htmlFor="website"
												className="form-label"
											>
												Website *
											</label>
											<input
												type="url"
												className="form-control"
												id="website"
												name="website"
												value={profileData.website}
												onChange={handleInputChange}
												placeholder="Enter your website URL"
												disabled={isLoading}
												required
											/>
										</div>
									</div>
								</div>

								{/* Address Information */}
								<div className="mb-4">
									<h5 className="text-primary mb-3">
										Address Information
									</h5>

									<div className="row">
										<div className="col-md-8 mb-3">
											<label
												htmlFor="address.street"
												className="form-label"
											>
												Street Address
											</label>
											<input
												type="text"
												className="form-control"
												id="address.street"
												name="address.street"
												value={
													profileData.address.street
												}
												onChange={handleInputChange}
												placeholder="Enter street address"
												disabled={isLoading}
											/>
										</div>
										<div className="col-md-4 mb-3">
											<label
												htmlFor="address.suite"
												className="form-label"
											>
												Suite/Apt
											</label>
											<input
												type="text"
												className="form-control"
												id="address.suite"
												name="address.suite"
												value={
													profileData.address.suite
												}
												onChange={handleInputChange}
												placeholder="Suite/Apt"
												disabled={isLoading}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6 mb-3">
											<label
												htmlFor="address.city"
												className="form-label"
											>
												City
											</label>
											<input
												type="text"
												className="form-control"
												id="address.city"
												name="address.city"
												value={profileData.address.city}
												onChange={handleInputChange}
												placeholder="Enter city"
												disabled={isLoading}
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label
												htmlFor="address.zipcode"
												className="form-label"
											>
												Zip Code
											</label>
											<input
												type="text"
												className="form-control"
												id="address.zipcode"
												name="address.zipcode"
												value={
													profileData.address.zipcode
												}
												onChange={handleInputChange}
												placeholder="Enter zip code"
												disabled={isLoading}
											/>
										</div>
									</div>

									<div className="row">
										<div className="col-md-6 mb-3">
											<label
												htmlFor="geo.lat"
												className="form-label"
											>
												Latitude
											</label>
											<input
												type="text"
												className="form-control"
												id="geo.lat"
												name="geo.lat"
												value={
													profileData.address.geo.lat
												}
												onChange={handleInputChange}
												placeholder="Enter latitude"
												disabled={isLoading}
											/>
										</div>
										<div className="col-md-6 mb-3">
											<label
												htmlFor="geo.lng"
												className="form-label"
											>
												Longitude
											</label>
											<input
												type="text"
												className="form-control"
												id="geo.lng"
												name="geo.lng"
												value={
													profileData.address.geo.lng
												}
												onChange={handleInputChange}
												placeholder="Enter longitude"
												disabled={isLoading}
											/>
										</div>
									</div>
								</div>

								{/* Company Information */}
								<div className="mb-4">
									<h5 className="text-primary mb-3">
										Company Information
									</h5>

									<div className="mb-3">
										<label
											htmlFor="company.name"
											className="form-label"
										>
											Company Name
										</label>
										<input
											type="text"
											className="form-control"
											id="company.name"
											name="company.name"
											value={profileData.company.name}
											onChange={handleInputChange}
											placeholder="Enter company name"
											disabled={isLoading}
										/>
									</div>

									<div className="mb-3">
										<label
											htmlFor="company.catchPhrase"
											className="form-label"
										>
											Company Catch Phrase
										</label>
										<input
											type="text"
											className="form-control"
											id="company.catchPhrase"
											name="company.catchPhrase"
											value={
												profileData.company.catchPhrase
											}
											onChange={handleInputChange}
											placeholder="Enter company catch phrase"
											disabled={isLoading}
										/>
									</div>

									<div className="mb-3">
										<label
											htmlFor="company.bs"
											className="form-label"
										>
											Company Business
										</label>
										<input
											type="text"
											className="form-control"
											id="company.bs"
											name="company.bs"
											value={profileData.company.bs}
											onChange={handleInputChange}
											placeholder="Enter company business description"
											disabled={isLoading}
										/>
									</div>
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

								{/* Submit Buttons */}
								<div className="d-grid gap-2 d-md-flex justify-content-md-end">
									<button
										type="button"
										className="btn btn-outline-secondary me-md-2"
										onClick={() => navigate("/register")}
										disabled={isLoading}
									>
										Back
									</button>
									<button
										type="submit"
										className="btn btn-primary"
										disabled={isLoading}
									>
										{isLoading ? (
											<>
												<span
													className="spinner-border spinner-border-sm me-2"
													role="status"
												></span>
												Completing Registration...
											</>
										) : (
											"Complete Registration"
										)}
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CompleteProfile;
