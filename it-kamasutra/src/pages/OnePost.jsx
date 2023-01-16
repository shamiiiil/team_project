import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOnePost } from "../features/post/postSlice";
import { addComment, deleteComment } from "../features/comments/commentSlice";
import { toast } from "react-toastify";
import "./OnePost.css";

const OnePost = () => {
  const params = useParams();
  const { onePost = {} } = useSelector((state) => state.post);
  const [comment, setComment] = React.useState('');
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(getOnePost({ postId: params?.id }));
  }, []);

  const addCommentHandler = (postId) => {
    dispatch(addComment({ postId, desc: comment, userId: onePost?.author._id, toast, dispatch }));
  };

  const deleteCommentHandler = (commentId) => {
    dispatch(deleteComment({ postId: onePost._id ,commentId, toast, dispatch, userId: onePost?.author._id }));
  };

  return (
    <div className="one-post__container">
      <div className="one-post">
        <h2>{onePost?.title}</h2>
        {onePost?.img ? (
          <img alt="image" src={onePost?.img} />
        ) : (
          <img alt="image" src="loader.svg" />
        )}
        <p>{onePost?.description}</p>
      </div>
      <div className="comments-block">
        <h3>Comments</h3>
        <textarea
          className="one-post__textarea"
          placeholder="Write a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={() => addCommentHandler(onePost._id)} className="one-post__button">Add comment</button>
        <div className="comments">
          {onePost?.comments?.map((comment) => {
            return (
              <div key={comment._id} className="comment">
                <p>{comment?.desc}</p>
                <p>{comment?.author}</p>
                <div>
                  <button onClick={() => deleteCommentHandler(comment._id)} className="comment__button">delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OnePost;
