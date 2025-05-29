import React, { createContext, useState, useEffect } from "react";
import { getCurrentUser } from "../utils/users";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		setCurrentUser(getCurrentUser()?.userId);
		//setCurrentUser(1); // For testing purposes, setting a static user ID
	}, []);

	return (
		<UserContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</UserContext.Provider>
	);
};
