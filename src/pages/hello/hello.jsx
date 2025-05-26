import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import CTASection from "./components/CTASection";
import FeatureHighlights from "./components/FeatureHighlights";
import TechStackFooter from "./components/TechStackFooter";

const Hello = () => {
	return (
		<div
			className="min-vh-100 d-flex align-items-center"
			style={{
				background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
				fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
			}}
		>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-lg-10 col-xl-8">
						<HeroSection />
						<FeaturesSection />
						<CTASection />
						<FeatureHighlights />
						<TechStackFooter />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Hello;
