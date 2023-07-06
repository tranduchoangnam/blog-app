import React from "react";
import { useNavigate } from "react-router-dom";
const Blog = ({ title, imgSrc }) => {
  const navigate = useNavigate();
  return (
    <div className="blog">
      <div className="blog_header">
        <div className="user_avatar">N</div>
        <button className="btn_read" onClick={() => navigate("/login")}>
          Read
          <i className="bx bxs-right-top-arrow-circle"></i>{" "}
        </button>

        <div className="option">
          <i className="bx bx-dots-vertical-rounded"></i>
        </div>
      </div>
      <div className="blog_content">
        <div className="title">{title}</div>
        <div className="time">Now</div>
        <div className="image">
          <img src={imgSrc} alt="" />
        </div>
      </div>
      <div className="blog_footer">
        <i className="bx bxs-upvote"></i>
        <i className="bx bxs-downvote"></i>
        <i className="bx bxs-comment-detail"></i>
        <i className="bx bxs-share"></i>
      </div>
    </div>
  );
};

export default Blog;
