import React, { useContext, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { create } from '../../../utils/dbUtil';

const FloatingActionButton = ({ activeTab, setData }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    let resource, data;
    const userId = currentUser?.id || 1;

    switch (activeTab) {
      case 'todos':
        resource = 'todos';
        data = {
          userId,
          title: 'New Todo',
          completed: false,
        };
        break;
      case 'posts':
        resource = 'posts';
        data = {
          userId,
          title: 'New Post',
          body: 'Post body...',
        };
        break;
      case 'albums':
        resource = 'albums';
        data = {
          userId,
          title: 'New Album',
        };
        break;
      default:
        return;
    }

    try {
      setLoading(true);
      // Simulate network delay for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newItem = await create(resource, data);
      setData(prev => [...prev, newItem]);
    } catch (e) {
      alert('Failed to add item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="btn btn-light border rounded-circle position-absolute d-flex align-items-center justify-content-center"
      style={{
        width: 70,
        height: 70,
        bottom: 30,
        right: 30,
        fontSize: 36,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        pointerEvents: loading ? 'none' : 'auto',
        opacity: loading ? 0.7 : 1,
      }}
      onClick={loading ? undefined : handleAdd}
      aria-label={`Add ${activeTab.slice(0, -1)}`}
      disabled={loading}
    >
      {loading ? (
        <span className="spinner-border" style={{ width: 32, height: 32 }} role="status" aria-hidden="true"></span>
      ) : (
        '+'
      )}
    </button>
  );
};

export default FloatingActionButton;