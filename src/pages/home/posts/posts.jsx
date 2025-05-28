import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { getAll } from '../../../utils/dbUtil';
import PostDetail from './postDetail';
import PostList from './PostList';
import { filterPosts } from '../../../utils/searchUtils';

const Posts = ({ posts, setPosts, searchTerm }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getAll('posts')
        .then(data => {
          const userPosts = data.filter(post => String(post.userId) === String(currentUser));
          setPosts(userPosts);
        })
        .finally(() => setLoading(false));
    } else {
      setPosts([]);
      setLoading(false);
    }
  }, [currentUser, setPosts]);

  if (loading) return <div>Loading posts...</div>;
  if (posts.length === 0) return <div>No posts found for this user.</div>;

  // Filter posts based on search term
  const filteredPosts = filterPosts(posts, searchTerm || '');

  return (
    <div>
      {searchTerm && (
        <div className="alert alert-info mb-3">
          <small>
            Found <strong>{filteredPosts.length}</strong> post{filteredPosts.length !== 1 ? 's' : ''} 
            {searchTerm && ` matching "${searchTerm}"`}
          </small>
        </div>
      )}
      <PostList
        posts={filteredPosts}
        setPosts={setPosts}
      />
    </div>
  );
};

export default Posts;