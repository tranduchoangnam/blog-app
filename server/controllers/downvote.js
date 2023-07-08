import prisma from "../prisma/index.js";
const createDownvote = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let downvote = await prisma.downvote.create({
    data: {
      userId: req.user.id,
      blogId: req.params.blogId,
      date: date,
    },
  });
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
  let downvote = await prisma.downvote.delete({
    where: {
      userId: req.user.id,
      blogId: req.params.blogId,
    },
  });
  return;
};
export { createDownvote, countDownvote, deleteDownvote };
