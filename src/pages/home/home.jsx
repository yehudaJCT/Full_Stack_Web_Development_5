import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/sidebar";
import SearchBar from "./Components/searchBar";
import FloatingActionButton from "./Components/floatingActionButton";
import Posts from "./posts/posts";
import Albums from "./albums/albums";
import Todos from "./todos/todos";
import { UserProvider } from "../../hooks/userProvider";

const Home = () => {
	const [activeTab, setActiveTab] = useState("posts");
	const [data, setData] = useState([]);
	const [searchTerm, setSearchTerm] = useState(""); 

	return (
		<UserProvider>
			<div className="container-fluid vh-100">
				<div className="d-flex h-100">
					<Sidebar
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
					<div className="flex-grow-1 p-4 position-relative">
						<div className="d-flex justify-content-center">
							<SearchBar
								searchTerm={searchTerm}
								setSearchTerm={setSearchTerm}
								activeTab={activeTab}
							/>
						</div>
						{activeTab === "posts" && (
							<Posts
								posts={data}
								setPosts={setData}
								searchTerm={searchTerm}
							/>
						)}
						{activeTab === "albums" && (
							<Albums
								albums={data}
								setAlbums={setData}
								searchTerm={searchTerm}
							/>
						)}
						{activeTab === "todos" && (
							<Todos
								todos={data}
								setTodos={setData}
								searchTerm={searchTerm}
							/>
						)}
						<FloatingActionButton
							activeTab={activeTab}
							setData={setData}
						/>
					</div>
				</div>
			</div>
		</UserProvider>
	);
};

export default Home;
