import React, { useState } from 'react';
import CommentList from './CommentList';

const PostList = ({ posts, setSelectedPost }) => {
  const [openedPostId, setOpenedPostId] = useState(null);

  const handleClick = (postId) => {
    setOpenedPostId(prev => (prev === postId ? null : postId));
  };

  return (
    <div>
      <h4>Your Posts</h4>
      <ul className="list-group">
        {posts.map(post => (
          <li
            key={post.id}
            className="list-group-item"
            onClick={() => handleClick(post.id)}
            onDoubleClick={() => setSelectedPost(post)}
            style={{ cursor: 'pointer' }}
            title="Click to show comments, double-click to edit"
          >
            <strong>{post.title}</strong>
            <p>{post.body}</p>
            {/* Show comments only if this post is opened */}
            {openedPostId === post.id && <CommentList postId={post.id} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;