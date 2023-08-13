import prisma from "../prisma/index.js";
import { countFollower } from "./follow.js";
import { getUser } from "./user.js";
const createComment = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  console.log(req.body);
  let comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      date: date,
      userId: req.user.id,
      blogId: parseInt(req.params.blog_id),
    },
  });
  let user = await getUser(comment.userId);

  return res.json({
    user: user,
    comment: comment,
    followers: await countFollower(user.id),
  });
};
const getComments = async (blogId) => {
  let comments = await prisma.comment.findMany({
    where: {
      blogId: parseInt(blogId),
    },
    orderBy: {
      date: "desc",
    },
  });
  comments = await Promise.all(
    comments.map(async (comment) => {
      let user = await getUser(comment.userId);
      return {
        user: user,
        comment: comment,
        followers: await countFollower(user.id),
      };
    })
  );
  return comments;
};

const countComment = async (blogId) => {
  let comment = await prisma.comment.count({
    where: {
      blogId: parseInt(blogId),
    },
  });
  return comment;
};
const deleteComment = async (req, res) => {
  let comment = await prisma.comment.delete({
    where: {
      id: req.params.commentId,
    },
  });
  return;
};
export { createComment, countComment, getComments, deleteComment };
