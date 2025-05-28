import React from "react";

const NavigationTabs = ({ activeTab, setActiveTab }) => {
	const tabs = [
		{ key: "posts", label: "posts" },
		{ key: "albums", label: "albums" },
		{ key: "todos", label: "todos" },
	];

	return (
		<div className="mb-3">
			{tabs.map((tab, index) => (
				<button
					key={tab.key}
					className={`btn w-100 text-start ${
						index < tabs.length - 1 ? "mb-2" : ""
					} ${
						activeTab === tab.key
							? "btn-outline-dark"
							: "btn-link text-dark text-decoration-none"
					}`}
					onClick={() => setActiveTab(tab.key)}
				>
					{tab.label}
				</button>
			))}
		</div>
	);
};

export default NavigationTabs;
