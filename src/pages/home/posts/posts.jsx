import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { getAll } from '../../../utils/dbUtil';
import PostDetail from './postDetail';
import PostList from './PostList';
import { filterPosts } from '../../../utils/searchUtils';
import { sortPosts } from '../../../utils/sortUtils';

const Posts = ({ searchTerm, sortBy = "id" }) => {
  const { currentUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setLoading(true);
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
  
  // Sort the filtered posts
  const sortedPosts = sortPosts(filteredPosts, sortBy);

  const getSortDescription = () => {
    switch (sortBy) {
      case "title":
        return "sorted by title";
      case "id":
      default:
        return "sorted by ID";
    }
  };

  return (
    <div>
      {(searchTerm || sortBy !== "id") && (
        <div className="alert alert-info mb-3">
          <small>
            {searchTerm ? (
              <>
                Found <strong>{sortedPosts.length}</strong> post{sortedPosts.length !== 1 ? 's' : ''} 
                {` matching "${searchTerm}"`}
                {sortBy !== "id" && `, ${getSortDescription()}`}
              </>
            ) : (
              <>
                Showing <strong>{sortedPosts.length}</strong> post{sortedPosts.length !== 1 ? 's' : ''} {getSortDescription()}
              </>
            )}
          </small>
        </div>
      )}
      <PostList
        posts={sortedPosts}
        setPosts={setPosts}
      />
    </div>
  );
};

export default Posts;