import React from "react";
import "./AddPostPage.css";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../features/post/postSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AddPostPage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const [tags, setTags] = React.useState("");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userId = user._id

  const addPostHandler = async (e) => {
    e.preventDefault();
    try {
      const post = {
        title,
        description: content,
        img: image,
        tags: tags.split(","),
      };
      dispatch(addPost({post, userId, toast, navigate}));
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <div className="new-post">
      <h3>New Post</h3>
      <form className="new-post__form">
        <label htmlFor="title">Title</label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title"
          id="title"
        />
        <label htmlFor="image">Image</label>
        <input
          onChange={(e) => setImage(e.target.value)}
          type="text"
          name="image"
          id="image"
        />
        <label htmlFor="content">Content</label>
        <textarea
          onChange={(e) => setContent(e.target.value)}
          name="content"
          id="content"
          cols="30"
          rows="10"
        ></textarea>
        <label htmlFor="tags">Tags</label>
        <input
          onChange={(e) => setTags(e.target.value)}
          type="text"
          name="tags"
          id="tags"
        />
        <button onClick={addPostHandler} type="submit">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;
