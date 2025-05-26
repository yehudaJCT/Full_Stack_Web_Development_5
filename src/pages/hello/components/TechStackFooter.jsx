import React from "react";

const TechStackFooter = () => {
	const technologies = ["React 19", "Bootstrap 5", "JSON Server", "Vite"];

	return (
		<div className="mt-3 pt-3 border-top border-white border-opacity-25">
			<div className="text-center text-white-50">
				<small className="d-block mb-2" style={{ fontSize: "0.75rem" }}>
					Powered by modern web technologies
				</small>
				<div className="d-flex justify-content-center gap-2 flex-wrap">
					{technologies.map((tech, index) => (
						<span
							key={index}
							className="badge bg-light text-dark px-2 py-1"
							style={{ fontSize: "0.7rem" }}
						>
							{tech}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};

export default TechStackFooter;
