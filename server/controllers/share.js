import prisma from "../prisma/index.js";
const createShare = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let share = await prisma.share.create({
    data: {
      userId: req.user.id,
      blogId: req.params.blogId,
      date: date,
    },
  });
};
const countShare = async (blogId) => {
  let share = await prisma.share.count({
    where: {
      blogId: blogId,
    },
  });
  return share;
};
const deleteShare = async (req, res) => {
  let share = await prisma.share.delete({
    where: {
      userId: req.user.id,
      blogId: req.params.blogId,
    },
  });
  return;
};
export { createShare, countShare, deleteShare };
