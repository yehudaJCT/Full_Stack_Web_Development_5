import React, { useState } from 'react';
import { update, remove } from '../../../utils/dbUtil';
import { useUrlNavigation } from '../../../hooks/useUrlNavigation';

const TodoDetail = ({ selectedTodo, setSelectedTodo, setTodos, onBack }) => {
  const [editTitle, setEditTitle] = useState(selectedTodo.title || '');
  const { navigateToTodos } = useUrlNavigation();

  const handleSave = async () => {
    try {
      const updated = await update('todos', selectedTodo.id, { 
        ...selectedTodo, 
        title: editTitle 
      });
      setTodos(prev => prev.map(t => (t.id === selectedTodo.id ? updated : t)));
      handleBack();
    } catch (err) {
      alert('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this todo?')) return;
    try {
      await remove('todos', selectedTodo.id);
      setTodos(prev => prev.filter(t => t.id !== selectedTodo.id));
      handleBack();
    } catch (err) {
      alert('Failed to delete todo');
    }
  };

  const handleBack = () => {
    setSelectedTodo(null);
    if (onBack) {
      onBack();
    } else {
      navigateToTodos();
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Edit Todo</h4>
        <small className="text-muted">Todo ID: {selectedTodo.id}</small>
      </div>
      
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          className="form-control"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
      </div>
      
      <div className="mb-3">
        <label className="form-label">Completed:</label>
        <input
          type="checkbox"
          checked={selectedTodo.completed}
          onChange={() =>
            setSelectedTodo({ ...selectedTodo, completed: !selectedTodo.completed })
          }
          className="form-check-input"
        />
      </div>
      
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
        <button className="btn btn-secondary" onClick={handleBack}>Back</button>
      </div>
    </div>
  );
};

export default TodoDetail;