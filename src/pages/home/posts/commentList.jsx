import React, { useEffect, useState } from 'react';
import { getAll } from '../../../utils/dbUtil';
import CommentDetail from './CommentDetail';
import FloatingActionButton from '../Components/floatingActionButton';



const CommentList = ({ postId, newComment = null }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComment, setSelectedComment] = useState(null);

  useEffect(() => {
    if (newComment) {
      setComments(prevComments => [...prevComments, newComment]);
    }
  }, [newComment]); // Empty effect to avoid warning about newComment

  useEffect(() => {
    getAll('comments')
      .then(data => {
        setComments(data.filter(comment => String(comment.postId) === String(postId)));
      })
      .finally(() => setLoading(false));
  }, [postId]);


  if (loading) return <div>Loading comments...</div>;
  if (comments.length === 0) return <div>No comments.</div>;
  if (selectedComment) {
    return (
      <CommentDetail
        comment={selectedComment}
        setEditingComment={setSelectedComment}
        refreshComments={setComments}
      />
    );
  }

  const handleDoubleClick = (comment) => {
    // TODO check if the user is the author of the comment
    setSelectedComment(comment);
  }

  return (
    <>
      <ul className="list-group mt-2">
        {comments.map(comment => (
          <li
            key={comment.id}
            className="list-group-item"
            onDoubleClick={() => handleDoubleClick(comment)}
            style={{ cursor: 'pointer' }}
            title="Double-click to edit comment"
          >
            <small>
              <strong>{comment.id}. </strong>
              <strong>{comment.name}</strong> ({comment.email})
              <p className="mb-0">{comment.body}</p>
            </small>
          </li>
        ))}
      </ul>
      <FloatingActionButton activeTab={"comments"} setData={setComments} />
    </>
  );
};

export default CommentList;