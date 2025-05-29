import React, { useState, useContext } from 'react';
import { update, remove, create, getItemId } from '../../../utils/dbUtil';
import CommentList from './CommentList';
import { useUrlNavigation } from '../../../hooks/useUrlNavigation';
import { UserContext } from '../../../hooks/userProvider';


const PostDetail = ({ selectedPost, setSelectedPost, setPosts, onBack }) => {
  const [editTitle, setEditTitle] = useState(selectedPost.title || '');
  const [editBody, setEditBody] = useState(selectedPost.body || '');
  const [newComment, setNewComment] = useState(null); // State for new comment
  const { navigateToPosts } = useUrlNavigation();
  const { currentUser } = useContext(UserContext);


  const handleSave = async () => {
    try {
      const updated = await update('posts', selectedPost.id, {
        ...selectedPost,
        title: editTitle,
        body: editBody
      });
      setPosts(prev => prev.map(p => (p.id === selectedPost.id ? updated : p)));
      handleBack();
    } catch (err) {
      alert('Failed to save changes');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await remove('posts', selectedPost.id);
      setPosts(prev => prev.filter(p => p.id !== selectedPost.id));
      handleBack();
    } catch (err) {
      alert('Failed to delete post');
    }
  };

  const handleBack = () => {
    setSelectedPost(null);
    if (onBack) {
      onBack();
    } else {
      navigateToPosts();
    }
  };

  const handleAddComment = async () => {
    try {
      const newCommentId = await getItemId('comments'); // Generate a new ID for the comment
      const newComment = {
        postId: selectedPost.id,
        id: newCommentId,
        name: 'New Comment',
        email: 'placeholder@example.com',
        body: 'This is a new comment.',
        userId: currentUser,
      };

      const newItem =  await create('comments', newComment); // Add the new comment to the database
      setNewComment(newItem); // Update state to trigger re-render
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Edit Post</h4>
        <small className="text-muted">Post ID: {selectedPost.id}</small>
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
        <label className="form-label">Body:</label>
        <textarea
          className="form-control"
          value={editBody}
          onChange={e => setEditBody(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleSave}>Save</button>
        <button className="btn btn-danger me-2" onClick={handleDelete}>Delete</button>
        <button className="btn btn-secondary" onClick={handleBack}>Back</button>
      </div>

      <CommentList postId={selectedPost.id} newComment={newComment} />
      <button className="btn btn-secondary mt-3" onClick={handleAddComment}>Add Comment</button>
    </div>
  );
};

export default PostDetail;