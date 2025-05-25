import React, {useState} from 'react';
import { getAll, patch, update, remove } from '../../../utils/dbUtil';

const TodoDetail = ({selectedTodo, setSelectedTodo, setTodos}) => {
  const [editTitle, setEditTitle] = useState(selectedTodo.title || '');


  const handleSave = async () => {
    try {
      const updated = await update('todos', selectedTodo.id, { ...selectedTodo, title: editTitle });
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

  return (
    <div>
      <h4>Edit Todo</h4>
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
      <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
      <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
      <button className="btn btn-secondary" onClick={handleBack}>Back</button>
    </div>
  );
};

export default TodoDetail;