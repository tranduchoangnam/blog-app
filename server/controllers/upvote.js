import prisma from "../prisma/index.js";
const createUpvote = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let upvote = await prisma.upvote.create({
    data: {
      userId: req.user.id,
      blogId: req.params.blogId,
      date: date,
    },
  });
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
  let upvote = await prisma.upvote.delete({
    where: {
      userId: req.user.id,
      blogId: req.params.blogId,
    },
  });
  return;
};
export { createUpvote, countUpvote, deleteUpvote };
