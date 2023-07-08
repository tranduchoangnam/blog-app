import prisma from "../prisma/index.js";
const createFollow = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let follow = await prisma.follow.create({
    data: {
      followerId: req.user.id,
      followingId: req.params.userId,
      date: date,
    },
  });
};
const countFollower = async (userId) => {
  let follower = await prisma.follow.count({
    where: {
      followingId: req.params.blogId,
    },
  });
  return follower;
};
const getFollower = async (userId) => {
  let follower = await prisma.follow.findMany({
    where: {
      followingId: req.params.blogId,
    },
  });
  return follower;
};
const getFollowing = async (userId) => {
  let following = await prisma.follow.findMany({
    where: {
      followerId: req.params.blogId,
    },
  });
  return following;
};
const countFollowing = async (userId) => {
  let following = await prisma.follow.count({
    where: {
      followerId: req.params.blogId,
    },
  });
  return following;
};
const deleteFollow = async (req, res) => {
  let follow = await prisma.follow.delete({
    where: {
      followerId: req.user.id,
      followingId: req.params.userId,
    },
  });
  return;
};
const getFollowingBlogs = async (req, res) => {
  let followingUsers = await prisma.follow.findMany({
    where: {
      followerId: req.user.id,
    },
  });
  let followingUserIds = followingUsers.map((user) => user.followingId);
  let blogs = await prisma.blog.findMany({
    where: {
      userId: { in: followingUserIds },
    },
    orderBy: { date: "desc" },
    take: 20,
  });
  let blogsObj = [];
  blogs.forEach(async (blog) => {
    blogsObj.push(await getBlog(blog.id));
  });
  res.send(blogsObj);
};
export {
  createFollow,
  countFollower,
  countFollowing,
  deleteFollow,
  getFollowingBlogs,
};
