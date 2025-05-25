import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider'; 
import { getAll, patch, update, remove } from '../../../utils/dbUtil';

const Todos = () => {
  const { currentUser } = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editText, setEditText] = useState('');

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
    console.log('Double clicked todo:', todo);
    setSelectedTodo(todo);
    setEditText(todo.title);
  };

  const handleSave = async () => {
    try {
      const updated = await update('todos', selectedTodo.id, { ...selectedTodo, title: editText });
      setTodos(prev => prev.map(t => (t.id === selectedTodo.id ? updated : t)));
      setSelectedTodo(null);
    } catch (err) {
      alert('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      await remove('todos', selectedTodo.id);
      setTodos(prev => prev.filter(t => t.id !== selectedTodo.id));
      setSelectedTodo(null);
    } catch (err) {
      alert('Failed to delete todo');
    }
  };

  const handleBack = () => {
    setSelectedTodo(null);
  };

  if (loading) return <div>Loading todos...</div>;
  if (todos.length === 0) return <div>No todos found for this user.</div>;

  // Detail view for selected todo
  if (selectedTodo) {
    return (
      <div>
        <h4>Edit Todo</h4>
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            className="form-control"
            value={editText}
            onChange={e => setEditText(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Completed:-</label>
          <input
            type="checkbox"
            checked={selectedTodo.completed}
            onChange={() =>
              setSelectedTodo({ ...selectedTodo, completed: !selectedTodo.completed })
            }
            className="form-check-input"
          />
        </div>
        <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
        <button className="btn btn-secondary" onClick={handleBack}>Back</button>
      </div>
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