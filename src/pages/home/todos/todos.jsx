import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../hooks/userProvider";
import { getAll } from "../../../utils/dbUtil";
import TodoList from "./todoList";
import { filterTodos } from "../../../utils/searchUtils";
import { sortTodos } from "../../../utils/sortUtils";

const Todos = ({ searchTerm, sortBy = "id" }) => {
	const { currentUser } = useContext(UserContext);
	const [todos, setTodos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (currentUser) {
			getAll("todos")
				.then((data) => {
					const userTodos = data.filter(
						(todo) => String(todo.userId) === String(currentUser)
					);
					setTodos(userTodos);
				})
				.finally(() => setLoading(false));
		} else {
			setTodos([]);
			setLoading(false);
		}
	}, [currentUser, setTodos]);

	if (loading) return <div>Loading todos...</div>;
	if (todos.length === 0) return <div>No todos found for this user.</div>;

	// Filter todos based on search term
	const filteredTodos = filterTodos(todos, searchTerm || "");
	
	// Sort the filtered todos
	const sortedTodos = sortTodos(filteredTodos, sortBy);

	const getSortDescription = () => {
		switch (sortBy) {
			case "title":
				return "sorted by title";
			case "completion":
				return "sorted by completion status";
			case "id":
			default:
				return "sorted by ID";
		}
	};

	return (
		<div>
			{(searchTerm || sortBy !== "id") && (
				<div className="alert alert-info mb-3">
					<small>
						{searchTerm ? (
							<>
								Found <strong>{sortedTodos.length}</strong> todo
								{sortedTodos.length !== 1 ? "s" : ""}
								{` matching "${searchTerm}"`}
								{sortBy !== "id" && `, ${getSortDescription()}`}
							</>
						) : (
							<>
								Showing <strong>{sortedTodos.length}</strong> todo
								{sortedTodos.length !== 1 ? "s" : ""} {getSortDescription()}
							</>
						)}
					</small>
				</div>
			)}
			<TodoList todos={sortedTodos} setTodos={setTodos} />
		</div>
	);
};

export default Todos;