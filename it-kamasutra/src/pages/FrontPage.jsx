import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "../features/post/postSlice";
import { format } from "date-fns";
import "./FrontPage.css";

const FrontPage = () => {
  const { posts, isLoading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className="front_page">
      {isLoading ? <img alt="loader" src="loader.svg"/> : posts?.map((post) => {
        return (
          <div key={post._id} className="front_page__post">
            <h2>{post.title}</h2>
            <div className="front_page__meta">
              <span>{post.author.username}</span>
              <span>{format(new Date(post.createdAt), "MM/dd/yyyy")}</span>
            </div>
            <img alt="img" src={post.img} />
            <p>{post.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default FrontPage;
