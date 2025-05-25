import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../hooks/userProvider';
import { getAll } from '../../../utils/dbUtil';

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
        <div>
            <h4>Your Posts</h4>
            <ul className="list-group">
                {posts.map(post => (
                    <li key={post.id} className="list-group-item">
                        <strong>{post.title}</strong>
                        <p>{post.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default Posts;