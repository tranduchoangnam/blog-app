import React from "react";
// import { useGlobalContext } from "../context";
const FullBlog = () => {
  //   const { user, logoutUser } = useGlobalContext();
  return (
    <div className="wrapper_right">
      <div className="blog">
        <div className="blog_header">
          <div className="user_avatar">N</div>
          <button className="btn_read">
            Read
            <i class="bx bxs-right-top-arrow-circle"></i>{" "}
          </button>

          <div className="option">
            <i className="bx bx-dots-vertical-rounded"></i>
          </div>
        </div>
        <div className="blog_content">
          <div className="title"></div>
          <div className="time"></div>
          <img src="" alt="" />
        </div>
        <div className="blog_footer">
          <i className="bx bxs-upvote"></i>
          <i className="bx bxs-downvote"></i>
          <i className="bx bxs-comment-detail"></i>
          <i className="bx bxs-share"></i>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
