import React from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../utils/users";
import ErrorPageLayout from "./components/ErrorPageLayout";
import ErrorHeroSection from "./components/ErrorHeroSection";
import ErrorDetailsCard from "./components/ErrorDetailsCard";
import ErrorActionButtons from "./components/ErrorActionButtons";
import HelpfulLinksSection from "./components/HelpfulLinksSection";

const NotFound = () => {
	const navigate = useNavigate();
	const currentUser = getCurrentUser();

	const handleGoHome = () => {
		if (currentUser) {
			navigate("/home");
		} else {
			navigate("/");
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<ErrorPageLayout>
			<ErrorHeroSection />

			<ErrorDetailsCard />

			<ErrorActionButtons
				onGoBack={handleGoBack}
				onGoHome={handleGoHome}
				currentUser={currentUser}
			/>

			<HelpfulLinksSection currentUser={currentUser} />
		</ErrorPageLayout>
	);
};

export default NotFound;
