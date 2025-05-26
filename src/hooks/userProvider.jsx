import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../utils/users";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		setCurrentUser(1);
		// setCurrentUser(getCurrentUser()?.userId);
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};
