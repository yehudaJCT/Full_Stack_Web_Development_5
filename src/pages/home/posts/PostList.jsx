import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import PostDetail from './postDetail';
import { useUrlNavigation } from '../../../hooks/useUrlNavigation';
import FloatingActionButton from '../Components/floatingActionButton';

const PostList = ({ posts, setPosts }) => {
  const [openedPostId, setOpenedPostId] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const { parseCurrentUrl, navigateToPost, navigateToPosts } = useUrlNavigation();

  // Parse URL to determine if we should show a specific post
  useEffect(() => {
    const urlState = parseCurrentUrl();
    if (urlState.activeItemId && urlState.activeTab === 'posts') {
      const postId = parseInt(urlState.activeItemId);
      const post = posts.find(p => p.id === postId);
      if (post) {
        setSelectedPost(post);
      }
    } else {
      setSelectedPost(null);
    }
  }, [parseCurrentUrl, posts]);

  const handleClick = (postId) => {
    setOpenedPostId(prev => (prev === postId ? null : postId));
  };

  const handleDoubleClick = (post) => {
    setSelectedPost(post);
    navigateToPost(post.id);
  };

  const handleBackToList = () => {
    setSelectedPost(null);
    navigateToPosts();
  };

  if (selectedPost) {
    return (
      <PostDetail
        selectedPost={selectedPost}
        setSelectedPost={setSelectedPost}
        setPosts={setPosts}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div>
      <h4>Your Posts</h4>
      <ul className="list-group">
        {posts.map(post => (
          <li
            key={post.id}
            className="list-group-item"
            onClick={() => handleClick(post.id)}
            onDoubleClick={() => handleDoubleClick(post)}
            style={{ cursor: 'pointer' }}
            title="Click to show comments, double-click to edit"
          >
            <strong>{post.id}. </strong>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
            {/* Show comments only if this post is opened */}
            {openedPostId === post.id && <CommentList postId={post.id} />}
          </li>
        ))}
      </ul>
      <FloatingActionButton activeTab={"posts"} setData={setPosts} />
    </div>
  );
};

export default PostList;