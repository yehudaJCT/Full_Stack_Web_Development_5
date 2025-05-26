import React, { useState } from 'react';
import { update, remove } from '../../../utils/dbUtil';
import CommentList from './CommentList'; // Import the new component


const PostDetail = ({ selectedPost, setSelectedPost, setPosts }) => {
  const [editTitle, setEditTitle] = useState(selectedPost.title || '');
  const [editBody, setEditBody] = useState(selectedPost.body || '');

  const handleSave = async () => {
    try {
      const updated = await update('posts', selectedPost.id, { ...selectedPost, title: editTitle, body: editBody });
      setPosts(prev => prev.map(p => (p.id === selectedPost.id ? updated : p)));
      setSelectedPost(null);
    } catch (err) {
      alert('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await remove('posts', selectedPost.id);
      setPosts(prev => prev.filter(p => p.id !== selectedPost.id));
      setSelectedPost(null);
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleBack = () => {
    setSelectedPost(null);
  };

  const handleAddComment = () => {
    // Logic to add a new comment can be implemented here
    // For now, we will just log a message
    console.log('Add comment functionality not implemented yet');
  }

  return (
    <div>
      <h4>Edit Post</h4>
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          className="form-control"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
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
      <CommentList postId={selectedPost.id} />
      <button className="btn btn-secondary mt-3" onClick={handleAddComment}>add comment</button>
    </div>
  );
};

export default PostDetail;
