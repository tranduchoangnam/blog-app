import React from "react";
import Blog from "./Blog";
import Skeleton from "./Skeleton";
const BlogList = ({ blogs, type }) => {
  if (!blogs) {
    return <Skeleton />;
  }
  return (
    <div className="container_grid">
      {blogs.map((blog) => (
        <Blog key={blog.blog.id} type={type} data={blog} />
      ))}
    </div>
  );
};

export default BlogList;
