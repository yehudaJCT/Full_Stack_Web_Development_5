import React from "react";

const FormCol = ({ children, size = "12", breakpoint = "md" }) => {
	const colClass = `col-${breakpoint}-${size} mb-3`;
	return <div className={colClass}>{children}</div>;
};

export default FormCol;
