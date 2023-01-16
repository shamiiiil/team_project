import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getPostsByUser,
  deletePostById,
  updatePost,
} from "../features/post/postSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";
import "./MyPosts.css";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineFolderView } from "react-icons/ai";

const MyPostsPage = () => {
  const { myPosts = [], isLoading } = useSelector((state) => state.post);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [post, setPost] = React.useState({
    title: "",
    description: "",
    img: "",
    tags: "",
    userId: "",
  });
  const [postId, setPostId] = React.useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const userId = user._id;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "300px",
      height: "300px",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "10px",
      backgroundColor: "gray",
    },
  };

  useEffect(() => {
    dispatch(getPostsByUser({ userId }));
  }, []);

  const openUpdateModal = (id) => {
    setIsOpen(true);
    const post = myPosts.find((post) => post._id === id);
    setPostId(id);
    setPost({
      title: post?.title,
      description: post?.description,
      img: post?.img,
      tags: post?.tags.join(", "),
      userId,
    });
  };

  const deletePost = (postId) => {
    console.log(postId);
    dispatch(deletePostById({ postId, userId, toast, dispatch }));
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const updatePostHandler = (e) => {
    e.preventDefault();
    // const newTags = tags.split(",").map((tag) => tag.trim());
    dispatch(
      updatePost({
        postId,
        post,
        toast,
        dispatch,
      })
    );
    closeModal();
  };

  return (
    <div className="front_page">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="upper-part-modal">
          <h2>Update Post</h2>
          <button className="close-button" onClick={closeModal}>
            x
          </button>
        </div>
        <form className="modal-form">
          <input
            onChange={(e) => {
              setPost({ ...post, title: e.target.value });
            }}
            value={post.title}
            type="text"
            placeholder="Title"
          />
          <textarea
            onChange={(e) => {
              setPost({ ...post, description: e.target.value });
            }}
            value={post.description}
            type="text"
            placeholder="Description"
          />
          <input
            onChange={(e) => {
              setPost({ ...post, img: e.target.value });
            }}
            value={post.img}
            type="text"
            placeholder="Image URL"
          />
          <input
            onChange={(e) => {
              setPost({ ...post, tags: e.target.value });
            }}
            value={post.tags}
            type="text"
            placeholder="Tags"
          />
          <button onClick={updatePostHandler}>Update</button>
        </form>
      </Modal>
      {isLoading ? (
        <img alt="loader" src="loader.svg" />
      ) : (
        myPosts?.map((post) => {
          return (
            <div key={post._id} className="front_page__post">
              <h2>{post.title}</h2>
              <div className="front_page__meta">
                <span>{post.author.username}</span>
                <span>{format(new Date(post.createdAt), "MM/dd/yyyy")}</span>
              </div>
              <img alt="img" src={post.img} />
              <p>{post.description}</p>
              <button
                className="front_page__dlt-btn"
                onClick={() => deletePost(post._id)}
              >
                <AiOutlineDelete />
              </button>
              <button className="front_page__upd-btn" onClick={() => openUpdateModal(post._id)}>
                <AiOutlineEdit/>
              </button>
              <Link to={`/my-posts/${post._id}`}>
                <button className="front_page__view-btn">
                  <AiOutlineFolderView />
                </button>
              </Link>
              <div className="">

              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyPostsPage;
