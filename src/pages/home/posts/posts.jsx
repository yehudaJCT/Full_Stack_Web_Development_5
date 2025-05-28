import React from 'react';
import PostList from './PostList';
import { filterPosts } from '../../../utils/searchUtils';
import { useDataManagement } from '../../../hooks/useDataManagement';

const Posts = ({ searchTerm }) => {
  const { data: posts, loading, error, setData: setPosts } = useDataManagement('posts');

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
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