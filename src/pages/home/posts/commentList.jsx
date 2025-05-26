import React, { useEffect, useState } from 'react';
import { getAll } from '../../../utils/dbUtil';


const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAll('comments')
      .then(data => {
        setComments(data.filter(comment => String(comment.postId) === String(postId)));
      })
      .finally(() => setLoading(false));
  }, [postId]);

  if (loading) return <div>Loading comments...</div>;
  if (comments.length === 0) return <div>No comments.</div>;

  return (
    <ul className="list-group mt-2">
      {comments.map(comment => (
        <li key={comment.id} className="list-group-item">
          <small>
            <strong>{comment.name}</strong> ({comment.email})
            <p className="mb-0">{comment.body}</p>
          </small>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;