import React, { useContext, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { create, getItemId } from '../../../utils/dbUtil';

const defaultFields = {
  todos: { title: '', completed: false },
  posts: { title: '', body: '' },
  albums: { title: '' },
};

const FloatingActionButton = ({ activeTab, setData }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [fields, setFields] = useState(defaultFields[activeTab] || {});

  // Reset fields when tab changes or form opens
  React.useEffect(() => {
    setFields(defaultFields[activeTab] || {});
  }, [activeTab, showForm]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFields(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let resource = activeTab;
    let id = await getItemId(resource);
    let newItemData = { userId: currentUser, id: id, ...fields };
    try {
      //await new Promise(resolve => setTimeout(resolve, 1000));
      const newItem = await create(resource, newItemData);
      setData(prev => [...prev, newItem]);
      setShowForm(false);
    } catch {
      alert('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-light border rounded-circle d-flex align-items-center justify-content-center"
        style={{
          position: 'fixed',
          width: 70,
          height: 70,
          bottom: 30,
          right: 30,
          fontSize: 36,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          pointerEvents: loading ? 'none' : 'auto',
          opacity: loading ? 0.7 : 1,
          zIndex: 1000,
        }}
        onClick={() => setShowForm(true)}
        aria-label={`Add ${activeTab.slice(0, -1)}`}
        disabled={loading}
      >
        +
      </button>

      {showForm && (
        <div
          style={{
            position: 'fixed',
            bottom: 120,
            right: 30,
            width: 320,
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: 12,
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
            padding: 24,
            zIndex: 2000,
          }}
        >
          <form onSubmit={handleSubmit}>
            <h5 className="mb-3">Add {activeTab.slice(0, -1)}</h5>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                name="title"
                className="form-control"
                value={fields.title}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            {activeTab === 'posts' && (
              <div className="mb-3">
                <label className="form-label">Body</label>
                <textarea
                  name="body"
                  className="form-control"
                  value={fields.body}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              </div>
            )}
            {activeTab === 'todos' && (
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="completed"
                  id="completed"
                  checked={fields.completed}
                  onChange={handleChange}
                  disabled={loading}
                />
                <label className="form-check-label" htmlFor="completed">
                  Completed
                </label>
              </div>
            )}
            <div className="d-flex justify-content-end gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowForm(false)}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm" />
                ) : (
                  'OK'
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FloatingActionButton;