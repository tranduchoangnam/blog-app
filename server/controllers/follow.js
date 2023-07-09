import prisma from "../prisma/index.js";
import { getBlog } from "./blog.js";
const createFollow = async (req, res) => {
  const date = new Date().toLocaleString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  let followed = await checkFollowed(req.user.id, req.params.user_id);
  if (followed) {
    await deleteFollow(req, res);
    res.send(false);
    return;
  }
  //if not followed
  let follow = await prisma.follow.create({
    data: {
      followerId: req.user.id,
      followingId: req.params.user_id,
      date: date,
    },
  });
  res.send(true);
};
const checkFollowed = async (followerId, followingId) => {
  let followed = await prisma.follow.findUnique({
    where: {
      followerId_followingId: {
        followerId: followerId,
        followingId: followingId,
      },
    },
  });
  if (followed) return true;
  return false;
};
const countFollower = async (userId) => {
  let follower = await prisma.follow.count({
    where: {
      followingId: userId,
    },
  });
  return follower;
};
const getFollower = async (userId) => {
  let follower = await prisma.follow.findMany({
    where: {
      followingId: userId,
    },
  });
  return follower;
};
const getFollowing = async (userId) => {
  let following = await prisma.follow.findMany({
    where: {
      followerId: userId,
    },
  });
  return following;
};
const countFollowing = async (userId) => {
  let following = await prisma.follow.count({
    where: {
      followerId: userId,
    },
  });
  return following;
};
const deleteFollow = async (req, res) => {
  let follow = await prisma.follow.delete({
    where: {
      followerId_followingId: {
        followerId: req.user.id,
        followingId: req.params.user_id,
      },
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
  console.log(followingUsers);
  let followingUserIds = followingUsers.reduce((userIds, user) => {
    if (user.followingId !== req.user.id) {
      userIds.push(user.followingId);
    }
    return userIds;
  }, []);
  console.log(followingUserIds);
  let blogs = await prisma.blog.findMany({
    where: {
      userId: { in: followingUserIds },
    },
    orderBy: { date: "desc" },
    take: 18,
  });
  let blogsObj = await Promise.all(
    blogs.map(async (blog) => {
      return await getBlog(blog.id, req.user.id);
    })
  );
  res.send(blogsObj);
};
export {
  createFollow,
  countFollower,
  getFollower,
  getFollowing,
  countFollowing,
  deleteFollow,
  getFollowingBlogs,
  checkFollowed,
};
