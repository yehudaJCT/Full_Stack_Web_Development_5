import React from "react";
import { Link } from "react-router-dom";

const HelpfulLinksSection = ({ currentUser }) => {
	const authenticatedLinks = [
		{ to: "/home", icon: "📊", label: "Dashboard" },
		{ to: "/profile", icon: "👤", label: "My Profile" },
	];

	const guestLinks = [
		{ to: "/", icon: "🏠", label: "Homepage" },
		{ to: "/login", icon: "🔑", label: "Sign In" },
		{ to: "/register", icon: "🚀", label: "Register" },
	];

	const links = currentUser ? authenticatedLinks : guestLinks;

	return (
		<div className="mt-4 pt-4 border-top">
			<p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
				Need help? Try these popular sections:
			</p>
			<div className="d-flex justify-content-center gap-3 flex-wrap">
				{links.map((link, index) => (
					<Link
						key={index}
						to={link.to}
						className="btn btn-link btn-sm text-decoration-none"
						style={{ color: "#667eea", fontSize: "0.85rem" }}
					>
						{link.icon} {link.label}
					</Link>
				))}
			</div>
		</div>
	);
};

export default HelpfulLinksSection;
