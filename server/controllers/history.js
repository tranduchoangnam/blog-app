import prisma from "../prisma/index.js";
import { getBlog } from "./blog.js";
const createHistory = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let history = await prisma.history.findUnique({
    where: {
      userId_blogId: {
        userId: req.user.id,
        blogId: parseInt(req.params.blog_id),
      },
    },
  });
  if (history) {
    let newHistory = await updateHistory(req, res);
    res.send(newHistory);
    return;
  }
  let newHistory = await prisma.history.create({
    data: {
      userId: req.user.id,
      blogId: parseInt(req.params.blog_id),
      date: date,
    },
  });
  res.send(newHistory);
};
const getHistory = async (req, res) => {
  //only take 18 recent history
  let history = await prisma.history.findMany({
    where: {
      userId: req.user.id,
    },
    orderBy: {
      date: "desc",
    },
    take: 18,
  });
  let blogsObj = await Promise.all(
    history.map(async (e) => {
      return await getBlog(e.blogId, req.user.id);
    })
  );

  res.send(blogsObj);
};
const countView = async (blog_id) => {
  let count = await prisma.history.count(
    {
      where: {
        blogId: blog_id,
      },
    },
    {
      distinct: ["userId"],
    } // Count distinct userId values
  );
  return count;
};
const deleteAllHistory = async (req, res) => {
  let history = await prisma.history.deleteMany({
    where: {
      userId: req.user.id,
    },
  });
  return;
};
const deleteHistory = async (req, res) => {
  let history = await prisma.history.delete({
    where: {
      userId_blogId: {
        userId: req.user.id,
        blogId: parseInt(req.params.blog_id),
      },
    },
  });
  res.send("ok");
};
const updateHistory = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let history = await prisma.history.update({
    where: {
      userId_blogId: {
        userId: req.user.id,
        blogId: parseInt(req.params.blog_id),
      },
    },
    data: {
      date: date,
    },
  });
  return history;
};

export {
  createHistory,
  getHistory,
  deleteAllHistory,
  deleteHistory,
  updateHistory,
  countView,
};
