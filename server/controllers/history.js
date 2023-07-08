import prisma from "../prisma/index.js";
import { getBlog } from "./blog.js";
const createHistory = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let history = await prisma.history.create({
    data: {
      userId: req.user.id,
      blogId: req.params.blogId,
      date: date,
    },
  });
  return;
};
const getHistory = async (req, res) => {
  //only take 9 recent history
  let history = await prisma.history.findMany({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      id: "desc",
    },
    take: 9,
  });
  let blogs = [];
  history.forEach(async (element) => {
    blogs.push({ blogId: await getBlog(element.blogId), date: element.date });
  });

  res.send(blogs);
};
const deleteAllHistory = async (req, res) => {
  let history = await prisma.history.deleteMany({
    where: {
      userId: req.user.userId,
    },
  });
  return;
};
const deleteHistory = async (req, res) => {
  let history = await prisma.history.deleteUniqe({
    where: {
      userId: req.user.userId,
      blogId: req.params.blogId,
    },
  });
  return;
};
const updateHistory = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let history = await prisma.history.update({
    where: {
      userId: req.user.userId,
      blogId: req.body.blogId,
    },
    data: {
      date: date,
    },
  });
  return;
};

export {
  createHistory,
  getHistory,
  deleteAllHistory,
  deleteHistory,
  updateHistory,
};
