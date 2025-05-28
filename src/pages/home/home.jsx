import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/sidebar";
import SearchBar from "./Components/searchBar";
import FloatingActionButton from "./Components/floatingActionButton";
import Breadcrumb from "./Components/Breadcrumb";
import Posts from "./posts/posts";
import Albums from "./albums/albums";
import Todos from "./todos/todos";
import { UserProvider } from "../../hooks/userProvider";
import { useUrlNavigation } from "../../hooks/useUrlNavigation";

const Home = () => {
	const [searchTerm, setSearchTerm] = useState(""); 
	const { parseCurrentUrl, navigateToSection } = useUrlNavigation();
	
	// Parse URL to determine current state
	const urlState = parseCurrentUrl();
	const [activeTab, setActiveTab] = useState(urlState.activeTab);

	// Update active tab when URL changes
	useEffect(() => {
		const currentUrlState = parseCurrentUrl();
		setActiveTab(currentUrlState.activeTab);
	}, [parseCurrentUrl]);

	// Handle tab changes with URL navigation
	const handleTabChange = (newTab) => {
		setActiveTab(newTab);
		navigateToSection(newTab);
		setSearchTerm(""); // Clear search when switching tabs
	};

	return (
		<UserProvider>
			<div className="container-fluid vh-100">
				<div className="d-flex h-100">
					<Sidebar
						activeTab={activeTab}
						setActiveTab={handleTabChange}
					/>
					<div className="flex-grow-1 p-4 position-relative">
						{/* Breadcrumb Navigation */}
						<Breadcrumb />
						
						<div className="d-flex justify-content-center">
							<SearchBar
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
								activeTab={activeTab}
							/>
						</div>
						
						{activeTab === "posts" && (
							<Posts searchTerm={searchTerm} />
						)}
						{activeTab === "albums" && (
							<Albums searchTerm={searchTerm} />
						)}
						{activeTab === "todos" && (
							<Todos searchTerm={searchTerm} />
						)}
						<FloatingActionButton
							activeTab={activeTab}
						/>
					</div>
				</div>
			</div>
		</UserProvider>
	);
};

export default Home;