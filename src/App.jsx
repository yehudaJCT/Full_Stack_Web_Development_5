import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Hello from "./pages/hello/hello.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import CompleteProfile from "./pages/auth/CompleteProfile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";
import ViewProfile from "./pages/profile/ViewProfile.jsx";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Hello />} />
			<Route path="/home" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/complete-profile" element={<CompleteProfile />} />
			<Route path="/profile" element={<ViewProfile />} />
			<Route path="/profile/edit" element={<EditProfile />} />
		</Routes>
	);
}

export default App;
