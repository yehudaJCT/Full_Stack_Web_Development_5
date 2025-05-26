import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { getAll } from '../../../utils/dbUtil';
import PostDetail from './postDetail';
import PostList from './PostList';

const Posts = () => {
    const { currentUser } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
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
    }, [currentUser]);

    if (loading) return <div>Loading posts...</div>;
    if (posts.length === 0) return <div>No posts found for this user.</div>;

    return (
        <PostList
            posts={posts}
            setPosts={setPosts}
        />
    );
};


export default Posts;