import prisma from "../prisma/index.js";
const createComment = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      date: date,
      userId: req.user.id,
      blogId: req.params.blogId,
    },
  });
};
const countComment = async (blogId) => {
  let comment = await prisma.comment.count({
    where: {
      blogId: blogId,
    },
  });
  return comment;
};
const deletecomment = async (req, res) => {
  let comment = await prisma.comment.delete({
    where: {
      id: req.params.commentId,
    },
  });
  return;
};
export { createComment, countComment, deletecomment };
