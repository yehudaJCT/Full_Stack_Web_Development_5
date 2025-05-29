import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Hello from "./pages/hello/hello.jsx";
import Login from "./pages/auth/login.jsx";
import Register from "./pages/auth/register.jsx";
import CompleteProfile from "./pages/auth/CompleteProfile.jsx";
import EditProfile from "./pages/profile/EditProfile.jsx";
import ViewProfile from "./pages/profile/ViewProfile.jsx";
import NotFound from "./pages/error/NotFound.jsx";

function App() {
	return (
		<Routes>
			{/* Main Application Routes */}
			<Route path="/" element={<Hello />} />
			<Route path="/home" element={<Home />} />
			
			{/* Authentication Routes */}
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/complete-profile" element={<CompleteProfile />} />
			
			{/* Profile Routes */}
			<Route path="/profile" element={<ViewProfile />} />
			<Route path="/profile/edit" element={<EditProfile />} />

			{/* Informative URLs for different sections */}
			<Route path="/users/:userId" element={<Home />} />
			<Route path="/users/:userId/posts" element={<Home />} />
			<Route path="/users/:userId/posts/:postId" element={<Home />} />
			<Route path="/users/:userId/albums" element={<Home />} />
			<Route path="/users/:userId/albums/:albumId" element={<Home />} />
			<Route
				path="/users/:userId/albums/:albumId/photos"
				element={<Home />}
			/>
			<Route
				path="/users/:userId/albums/:albumId/photos/:photoId"
				element={<Home />}
			/>
			<Route path="/users/:userId/todos" element={<Home />} />
			<Route path="/users/:userId/todos/:todoId" element={<Home />} />

			{/* 404 - Catch all unmatched routes */}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;