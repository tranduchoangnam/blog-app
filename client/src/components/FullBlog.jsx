import React from "react";
import { useGlobalContext } from "../context";
import { handleData } from "../utils/handleData";
import axios from "axios";
import backendURL from "../utils/backendUrl";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CommentBox from "./Comment";
// import { useGlobalContext } from "../context";

const FullBlog = ({ data, type }) => {
  const [toggle, setToggle] = useState(data.followed);
  const navigate = useNavigate();
  const { user } = useGlobalContext();
  const handleFollow = async () => {
    if (!type.enable) return;
    try {
      const response = await axios.get(
        `${backendURL}/api/follow/${data.owner.id}`,
        {
          withCredentials: true,
        }
      );
      // setFollowed(!followed);

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const followButton = (
    <>
      {toggle ? (
        <button
          className="btn_follow followed"
          onClick={() => {
            setToggle(!toggle);
            handleFollow();
          }}
        >
          Followed
        </button>
      ) : (
        <button
          className="btn_follow"
          onClick={() => {
            setToggle(!toggle);
            handleFollow();
          }}
        >
          Follow
        </button>
      )}
    </>
  );

  return (
    <div className="wrapper_right">
      <div className="blog full">
        <div className="blog_header">
          <div className="user_profile">
            <div className="user_avatar">
              <img
                alt="avatar"
                src={data.owner.photo}
                onClick={() => navigate(`/dashboard/${data.owner.id}`)}
              />
            </div>
            <div className="user_info">
              <h3>{data.owner.email ? data.owner.email : data.owner.id}</h3>
              <h5>{data.owner.name}</h5>
              {!user ? (
                followButton
              ) : (
                <>{user.id !== data.owner.id ? <>{followButton}</> : <></>}</>
              )}
            </div>
          </div>
          <div className="blog_info">
            <div className="view">
              <div className="count">
                <div className="material-symbols-outlined">visibility</div>
                {data.countView}
              </div>
              <div className="count">
                <i className="bx bxs-comment-detail"></i>
                {data.countComment}
              </div>
              <div className="count">
                <i>
                  <span className="material-symbols-rounded">share</span>
                </i>
                {data.countShare}
              </div>
            </div>
            <div className="blog_footer">
              <div className="count">
                <i className="bx bxs-upvote"></i>
                {data.countUpvote}
              </div>
              <div className="count">
                <i className="bx bxs-downvote"></i>
                {data.countDownvote}
              </div>
            </div>
            <div style={{ textAlign: "end" }}>Posted at {data.blog.date}</div>
          </div>
        </div>
        <div className="blog_content" style={{ height: "auto" }}>
          <div className="title" style={{ fontSize: "40px" }}>
            {data.blog.title}
          </div>
          <div className="time">Now</div>
        </div>
        <div className="content">{handleData(data.blog.content)}</div>
      </div>
      <CommentBox data={data} />;
    </div>
  );
};

export default FullBlog;
