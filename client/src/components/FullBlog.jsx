import React from "react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";
// import { useGlobalContext } from "../context";
const FullBlog = ({ title, content }) => {
  //   const { user, logoutUser } = useGlobalContext();
  const handleData = (dirtyHTML) => {
    const cleanHTML = DOMPurify.sanitize(dirtyHTML, {
      USE_PROFILES: { html: true },
    });
    return parse(cleanHTML);
  };
  // {showData && <div>{parse(handleData(contentData))}</div>}

  return (
    <div className="wrapper_right">
      <div className="blog full">
        <div className="blog_header">
          <div className="user_avatar">N</div>
          <div className="option">
            <i className="bx bx-dots-vertical-rounded"></i>
          </div>
        </div>
        <div className="blog_content" style={{ height: "auto" }}>
          <div className="title" style={{ fontSize: "40px" }}>
            {title}
          </div>
          <div className="time">Now</div>
        </div>
        <div className="content">{handleData(content)}</div>

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
