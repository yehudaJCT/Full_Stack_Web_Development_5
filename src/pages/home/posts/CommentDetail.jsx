import React, { useState } from 'react';
import { update, remove } from '../../../utils/dbUtil';

const CommentDetail = ({ comment, setEditingComment, refreshComments }) => {
  const [editName, setEditName] = useState(comment.name || '');
  const [editEmail, setEditEmail] = useState(comment.email || '');
  const [editBody, setEditBody] = useState(comment.body || '');

  const handleSave = async () => {
    try {
      await update('comments', comment.id, {
        ...comment,
        name: editName,
        email: editEmail,
        body: editBody,
      });
      refreshComments();
      setEditingComment(null);
    } catch (err) {
      alert('Failed to save comment');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    try {
      await remove('comments', comment.id);
      refreshComments();
      setEditingComment(null);
    } catch (err) {
      alert('Failed to delete comment');
    }
  };

  const handleBack = () => {
    setEditingComment(null);
  };

  return (
    <div>
      <h5>Edit Comment</h5>
      <div className="mb-2">
        <label className="form-label">Name:</label>
        <input
          className="form-control"
          value={editName}
          onChange={e => setEditName(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Email:</label>
        <input
          className="form-control"
          value={editEmail}
          onChange={e => setEditEmail(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Body:</label>
        <textarea
          className="form-control"
          value={editBody}
          onChange={e => setEditBody(e.target.value)}
        />
      </div>
      <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
      <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
      <button className="btn btn-secondary" onClick={handleBack}>Back</button>
    </div>
  );
};

export default CommentDetail;