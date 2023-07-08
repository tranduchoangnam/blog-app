import React from "react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
import { useGlobalContext } from "../context";
const Blog = ({
  id,
  title,
  content,
  imgSrc,
  date,
  countUpvote,
  countDownvote,
  countShare,
  countComment,
  preview,
}) => {
  const { user } = useGlobalContext();
  const navigate = useNavigate();
  const handleData = (dirtyHTML) => {
    const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
      USE_PROFILES: { html: true },
    });
    return parse(cleanHTML);
  };
  const handleTitle = (title) => {
    if (title.length > 60) {
      return title.slice(0, 55) + "...";
    }
    return title;
  };
  const handlePreivew = (preview, url) => {
    if (preview) return;
    if (!user) navigate("/login");
    navigate(url);
  };
  return (
    <div className="blog">
      <div className="blog_header">
        <div className="user_avatar">N</div>
        <button
          className="btn_read"
          onClick={() => {
            handlePreivew(preview, `/blog/${id}`);
          }}
        >
          Read
          <i className="bx bxs-right-top-arrow-circle"></i>{" "}
        </button>

        <div className="option">
          <i className="bx bx-dots-vertical-rounded"></i>
        </div>
      </div>
      <div className="blog_content">
        <div className="title">{handleTitle(title)}</div>
        <div className="time">{date}</div>
        {!preview ? (
          <div className="scroll_content">{handleData(content)}</div>
        ) : (
          <div className="image">
            <img src={imgSrc} alt="" />
          </div>
        )}
      </div>
      <div className="blog_footer">
        <i className="bx bxs-upvote">{countUpvote}</i>
        <i className="bx bxs-downvote">{countDownvote}</i>
        <i className="bx bxs-comment-detail">{countComment}</i>
        <i className="bx bxs-share">{countShare}</i>
      </div>
    </div>
  );
};

export default Blog;
