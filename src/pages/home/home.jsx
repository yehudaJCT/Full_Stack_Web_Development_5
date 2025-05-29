import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/sidebar";
import SearchBar from "./Components/searchBar";
import Posts from "./posts/posts";
import Albums from "./albums/albums";
import Breadcrumb from "./Components/Breadcrumb";
import Todos from "./todos/todos";
import { UserProvider } from "../../hooks/userProvider";
import { useUrlNavigation } from "../../hooks/useUrlNavigation";
import { useUserAccess } from "../../hooks/useUserAccess";
import AccessDenied from "../Components/ui/AccessDenied";

const Home = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("id"); // Default sort by ID
  const { parseCurrentUrl, navigateToSection } = useUrlNavigation();
  const { isAuthorized, isLoading, error, redirectToUserData } = useUserAccess();

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
    setSortBy("id"); // Reset sort to default when switching tabs
  };

  // Handle redirect to user's own data
  const handleRedirectToUserData = () => {
    redirectToUserData();
  };

  // Show loading while checking access
  if (isLoading) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{
          background:
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="text-center text-white">
          <div
            className="spinner-border mb-3"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Verifying access permissions...</p>
        </div>
      </div>
    );
  }

  // Show access denied if unauthorized
  if (!isAuthorized && error) {
    return (
      <AccessDenied error={error} onRedirect={handleRedirectToUserData} />
    );
  }

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
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>
            {activeTab === "posts" && (
              <Posts
                searchTerm={searchTerm}
                sortBy={sortBy}
              />
            )}
            {activeTab === "albums" && (
              <Albums
                searchTerm={searchTerm}
                sortBy={sortBy}
              />
            )}
            {activeTab === "todos" && (
              <Todos
                searchTerm={searchTerm}
                sortBy={sortBy}
              />
            )}
          </div>
        </div>
      </div>
    </UserProvider>
  );
};

export default Home;