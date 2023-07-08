import prisma from "../prisma/index.js";
import { countShare } from "./share.js";
import { countUpvote } from "./upvote.js";
import { countDownvote } from "./downvote.js";
import { countComment } from "./comment.js";
const createBlog = async (data) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let blog = await prisma.blog.create({
    data: {
      title: data.title,
      content: data.content,
      tags: data.tags,
      photo: data.photo,
      date: date,
      userId: data.userId,
    },
  });
};
const getBlog = async (blogId) => {
  let blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });
  let obj = {
    blog: blog,
    countUpvote: await countUpvote(blogId),
    countDownvote: await countDownvote(blogId),
    countShare: await countShare(blogId),
    countComment: await countComment(blogId),
  };
  // console.log(obj);
  return obj;
};
const getMyBlogs = async (userId) => {
  let blogs = await prisma.blog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: "desc",
    },
    take: 18,
  });

  let blogsObj = await Promise.all(
    blogs.map(async (blog) => {
      return await getBlog(blog.id);
    })
  );
  return blogsObj;
};
const getNewestBlogs = async (req, res) => {
  let blogs = await prisma.blog.findMany({
    orderBy: {
      date: "desc",
    },
    take: 18,
  });
  let blogsObj = await Promise.all(
    blogs.map(async (blog) => {
      return await getBlog(blog.id);
    })
  );
  res.send(blogsObj);
};

const deleteBlog = async (req, res) => {
  let blog = await prisma.blog.delete({
    where: {
      id: req.user.id,
      blogId: req.params.blogId,
    },
  });
  return;
};
const updateBlog = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let blog = await prisma.blog.update({
    where: {
      id: req.params.blogId,
      userId: req.user.id,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      photo: req.body.photo,
      date: date,
    },
  });
  return;
};
export {
  createBlog,
  getBlog,
  getMyBlogs,
  getNewestBlogs,
  deleteBlog,
  updateBlog,
};
