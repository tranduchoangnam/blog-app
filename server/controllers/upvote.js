import { exists } from "fs-extra";
import prisma from "../prisma/index.js";
const createUpvote = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let upvoted = await checkUpvoted(req.params.blog_id, req.user.id);
  if (upvoted) {
    await deleteUpvote(req, res);
    return;
  }
  //if not upvoted
  let upvote = await prisma.upvote.create({
    data: {
      userId: req.user.id,
      blogId: parseInt(req.params.blog_id),
      date: date,
    },
  });
  return;
};
const countUpvote = async (blogId) => {
  let upvote = await prisma.upvote.count({
    where: {
      blogId: blogId,
    },
  });
  return upvote;
};
const deleteUpvote = async (req, res) => {
  let upvoted = await checkUpvoted(req.params.blog_id, req.user.id);
  if (upvoted) {
    let upvote = await prisma.upvote.delete({
      where: {
        userId_blogId: {
          userId: req.user.id,
          blogId: parseInt(req.params.blog_id),
        },
      },
    });
  }
  return;
};
const checkUpvoted = async (blogId, userId) => {
  let upvoted = await prisma.upvote.findUnique({
    where: {
      userId_blogId: {
        userId: userId,
        blogId: parseInt(blogId),
      },
    },
  });
  if (upvoted) {
    return true;
  }
  return false;
};
export { createUpvote, countUpvote, deleteUpvote, checkUpvoted };
