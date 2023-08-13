import { exists } from "fs-extra";
import prisma from "../prisma/index.js";
import { parse } from "path";
const createDownvote = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let downvoted = await checkDownvoted(req.params.blog_id, req.user.id);
  if (downvoted) {
    await deleteDownvote(req, res);
    return;
  }
  //if not Downvoted
  let downvote = await prisma.downvote.create({
    data: {
      userId: req.user.id,
      blogId: parseInt(req.params.blog_id),
      date: date,
    },
  });
  return;
};
const countDownvote = async (blogId) => {
  let downvote = await prisma.downvote.count({
    where: {
      blogId: blogId,
    },
  });
  return downvote;
};
const deleteDownvote = async (req, res) => {
  let downvoted = await checkDownvoted(req.params.blog_id, req.user.id);
  if (downvoted) {
    let downvote = await prisma.downvote.delete({
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
const checkDownvoted = async (blogId, userId) => {
  let downvoted = await prisma.downvote.findUnique({
    where: {
      userId_blogId: {
        userId: userId,
        blogId: parseInt(blogId),
      },
    },
  });
  if (downvoted) {
    return true;
  }
  return false;
};
export { createDownvote, countDownvote, deleteDownvote, checkDownvoted };
