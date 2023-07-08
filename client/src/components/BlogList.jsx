import React from "react";
import Blog from "./Blog";
import Skeleton from "./Skeleton";
const BlogList = ({ blogs, preview }) => {
  if (!blogs) {
    return <Skeleton />;
  }
  return (
    <div className="container_grid">
      {blogs.map((blog) => (
        <Blog
          preview={preview}
          key={blog.blog.id}
          userId={blog.blog.user_id}
          title={blog.blog.title}
          content={blog.blog.content}
          imgSrc={blog.blog.photo}
          date={blog.blog.date}
          tags={blog.blog.tags}
          countUpvote={blog.countUpvote}
          countDownvote={blog.countDownvote}
          countShare={blog.countShare}
          countComment={blog.countComment}
        />
      ))}
    </div>
  );
};

export default BlogList;
