import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider'; 
import { getAll, patch, update, remove } from '../../../utils/dbUtil';
import TodoDetail from './TodoDetail'; // Assuming you have a separate component for TodoDetail

const Todos = () => {
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);


  useEffect(() => {
    if (currentUser) {
      getAll('todos')
        .then(data => {
          const userTodos = data.filter(todo => String(todo.userId) === String(currentUser));
          setTodos(userTodos);
        })
        .finally(() => setLoading(false));
    } else {
      setTodos([]);
      setLoading(false);
    }
  }, [currentUser]);

  const handleToggle = async (todo) => {
    try {
      const updated = await patch('todos', todo.id, { completed: !todo.completed });
      setTodos(prev => prev.map(t => (t.id === todo.id ? { ...t, completed: updated.completed } : t)));
    } catch (err) {
      alert('Failed to update todo');
    }
  };

  const handleDoubleClick = (todo) => {
    setSelectedTodo(todo);
  };


  if (loading) return <div>Loading todos...</div>;
  if (todos.length === 0) return <div>No todos found for this user.</div>;

  // Detail view for selected todo
  if (selectedTodo) {
    return (
      <TodoDetail
        selectedTodo={selectedTodo}
        setSelectedTodo={setSelectedTodo}
        setTodos={setTodos}
      />
    );
  }

  // List view
  return (
    <div>
      <h4>Your Todos</h4>
      <ul className="list-group">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`}
            onDoubleClick={() => handleDoubleClick(todo)}
            style={{ cursor: "pointer" }}
            title="Double-click to edit"
          >
            <span>{todo.title}</span>
            <span>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo)}
                className="form-check-input"
                style={{ cursor: "pointer" }}
                aria-label={todo.completed ? "Completed" : "Pending"}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;