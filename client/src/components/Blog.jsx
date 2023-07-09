import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleData, handleTitle } from "../utils/handleData.js";
import { useGlobalContext } from "../context";
import axios from "axios";
import backendURL from "../utils/backendUrl";
const Blog = ({ data, type }) => {
  const [deleted, setDeleted] = useState(false);
  const [upvote, setUpvote] = useState(data.countUpvote);
  const [downvote, setDownvote] = useState(data.countDownvote);
  const [toggle, setToggle] = useState(false);
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const handleRead = async (type, url) => {
    if (!type.enable) return;
    if (!user) navigate("/login");
    try {
      const response = await axios.get(
        `${backendURL}/api/react/view/${data.blog.id}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }

    navigate(url);
  };
  const handleUpvote = async (type) => {
    if (!type.enable) return;
    if (!user) navigate("/login");

    try {
      const response = await axios.get(
        `${backendURL}/api/react/upvote/${data.blog.id}`,
        {
          withCredentials: true,
        }
      );
      setUpvote(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownvote = async (type) => {
    if (!type.enable) return;
    if (!user) navigate("/login");

    try {
      const response = await axios.get(
        `${backendURL}/api/react/downvote/${data.blog.id}`,
        {
          withCredentials: true,
        }
      );
      setDownvote(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (type) => {
    if (!type.enable) return;
    if (user.id !== data.owner.id) return;

    if (!user) navigate("/login");
    try {
      const response = await axios.delete(
        `${backendURL}/api/delete_blog/${data.blog.id}`,
        {
          withCredentials: true,
        }
      );
      setDeleted(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleOptionClick = (event) => {
    setToggle(!toggle);
  };
  const optionBox = (
    <div className="option_box">
      <div className="element " onClick={() => handleDelete(type)}>
        Delete
      </div>
      <div className="element">Share</div>
    </div>
  );

  return (
    <>
      {!deleted && (
        <>
          <div className="blog">
            <div className="blog_header">
              <div className="user_avatar">
                <img src={data.owner.photo} alt="avatar" />
              </div>
              <button
                className="btn_read"
                onClick={() => {
                  handleRead(type, `/blog/${data.blog.id}`);
                }}
              >
                Read
                <i className="bx bxs-right-top-arrow-circle"></i>{" "}
              </button>

              <div
                className="option"
                onClick={() => {
                  handleOptionClick();
                }}
              >
                <i className="bx bx-dots-vertical-rounded"></i>
                {toggle && <>{optionBox}</>}
              </div>
            </div>
            <div className="blog_content">
              <div className="title">{handleTitle(data.blog.title)}</div>
              <div className="time">{data.blog.date}</div>
              {!type.preview ? (
                <div className="scroll_content">
                  {handleData(data.blog.content)}
                </div>
              ) : (
                <div className="image">
                  <img src={data.blog.photo} alt="" />
                </div>
              )}
            </div>
            <div className="blog_footer">
              <i className="bx bxs-upvote" onClick={() => handleUpvote(type)}>
                {upvote}
              </i>
              <i
                className="bx bxs-downvote"
                onClick={() => handleDownvote(type)}
              >
                {downvote}
              </i>
              <i className="bx bxs-comment-detail">{data.countComment}</i>
              {/* <span class="material-symbols-rounded">{data.countShare}</span> */}
              {/* <i className="bx bxs-share">{data.countShare}</i> */}
            </div>
          </div>
        </>
      )}
    </>
  );

  //     )});
};

export default Blog;
