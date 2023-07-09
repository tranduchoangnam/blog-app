import prisma from "../prisma/index.js";
import { countShare } from "./share.js";
import { countUpvote } from "./upvote.js";
import { countDownvote } from "./downvote.js";
import { countComment } from "./comment.js";
import { countView } from "./history.js";
import { getUser } from "./user.js";
import { checkFollowed } from "./follow.js";
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
  return;
};
const getBlog = async (blogId, userId) => {
  let blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  let obj = {
    blog: blog,
    owner: await getUser(blog.userId),
    countUpvote: await countUpvote(blogId),
    countDownvote: await countDownvote(blogId),
    countShare: await countShare(blogId),
    countComment: await countComment(blogId),
    countView: await countView(blogId),
  };
  if (userId) {
    obj.followed = await checkFollowed(userId, blog.userId);
  } else obj.followed = false;
  // console.log({ userId: userId, flid: blog.userId, followed: obj.followed });
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
      return await getBlog(blog.id, userId);
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
  const userId = req.user ? req.user.id : null;
  let blogsObj = await Promise.all(
    blogs.map(async (blog) => {
      return await getBlog(blog.id, userId);
    })
  );
  res.send(blogsObj);
};

const deleteBlog = async (req, res) => {
  let blog = await prisma.blog.delete({
    where: {
      id: parseInt(req.params.blog_id),
    },
  });
  res.send("deleted");
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
