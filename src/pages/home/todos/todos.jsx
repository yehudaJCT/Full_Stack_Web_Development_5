import React from "react";
import TodoList from "./todoList";
import { filterTodos } from "../../../utils/searchUtils";
import { useDataManagement } from "../../../hooks/useDataManagement";

const Todos = ({ searchTerm }) => {
	const { data: todos, loading, error, setData: setTodos } = useDataManagement('todos');

	if (loading) return <div>Loading todos...</div>;
	if (error) return <div className="alert alert-danger">{error}</div>;
	if (todos.length === 0) return <div>No todos found for this user.</div>;

	// Filter todos based on search term
	const filteredTodos = filterTodos(todos, searchTerm || "");

	return (
		<div>
			{searchTerm && (
				<div className="alert alert-info mb-3">
					<small>
						Found <strong>{filteredTodos.length}</strong> todo
						{filteredTodos.length !== 1 ? "s" : ""}
						{searchTerm && ` matching "${searchTerm}"`}
					</small>
				</div>
			)}
			<TodoList todos={filteredTodos} setTodos={setTodos} />
		</div>
	);
};

export default Todos;