import prisma from "../prisma/index.js";
import { getMyBlogs } from "./blog.js";
import { countFollower, countFollowing, checkFollowed } from "./follow.js";
const createUser = async (data) => {
  let user = await prisma.user.create({
    data: {
      id: data.id,
      email: data.email,
      photo: data.photo,
      name: data.name,
      bio: data.bio,
      created_at: data.created_at,
    },
  });
  return user;
};
const getUser = async (userId) => {
  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
};
const getUserProfile = async (req, res) => {
  let user = await prisma.user.findUnique({
    where: {
      id: req.params.user_id,
    },
  });
  const userId = req.user ? req.user.id : "";
  let obj = {};
  obj.user = user;
  obj.blogs = await getMyBlogs(req.params.user_id);
  obj.countFollower = await countFollower(req.params.user_id);
  obj.countFollowing = await countFollowing(req.params.user_id);
  obj.followed = await checkFollowed(userId, req.params.user_id);
  // console.log(obj);
  res.send(obj);
};

const deleteUser = async (req, res) => {
  let user = await prisma.user.delete({
    where: {
      id: req.user.id,
    },
  });
  return;
};
const updateUser = async (data) => {
  let user = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      email: data.email,
      photo: data.photo,
      name: data.name,
      bio: data.bio,
      updated_at: data.updated_at,
    },
  });
  return user;
};

export { createUser, getUser, getUserProfile, deleteUser, updateUser };
