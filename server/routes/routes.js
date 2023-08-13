import express from "express";
import passport from "passport";
import isUserAuthenticated from "../middlewares/checkAuth.js";
import upload from "../middlewares/upload.js";
import {
  createUser,
  getUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/user.js";
import {
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
  getNewestBlogs,
} from "../controllers/blog.js";
import { getHistory, createHistory } from "../controllers/history.js";
import { getFollowingBlogs, createFollow } from "../controllers/follow.js";
import dotenv from "dotenv";
import {
  createUpvote,
  deleteUpvote,
  countUpvote,
} from "../controllers/upvote.js";
import {
  createDownvote,
  deleteDownvote,
  countDownvote,
} from "../controllers/downvote.js";
import { createComment, deleteComment } from "../controllers/comment.js";
import { createShare } from "../controllers/share.js";

dotenv.config();
const router = express.Router();
const successLoginUrl = `${process.env.FRONTEND_URL}/login/success`;
const failureLoginUrl = `${process.env.FRONTEND_URL}/login/error`;

router.get("/", (req, res) => {
  res.send("Hello ?");
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    prompt: "select_account consent",
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: successLoginUrl,
    failureRedirect: failureLoginUrl,
  })
);
// router.get(
//   "/auth/facebook",
//   passport.authenticate("facebook", {
//     authType: "reauthenticate",
//     scope: ["public_profile", "email"],
//   })
// );

// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", {
//     successRedirect: "/api/current_user",
//     failureRedirect: "/auth/facebook/failure",
//   })
// );
router.delete("/logout", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.send("Logged out");
  });
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
router.get("/auth/facebook/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.get("/api/public_user/:userId", (req, res) => {
  res.json(getUser(req.params.userId));
});

router.post("/api/create_user", async (req, res) => {
  const user = await createUser(req.body);
  res.json(user);
});
router.get("/api/update_user", isUserAuthenticated, updateUser);
router.delete("/api/delete_user", isUserAuthenticated, deleteUser);
router.get("/api/current_user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/api/home", getNewestBlogs);
router.get("/api/dashboard/:user_id", getUserProfile);
router.get("/api/following", isUserAuthenticated, getFollowingBlogs);

router.get("/api/history", isUserAuthenticated, getHistory);

router.post("/api/create_blog", isUserAuthenticated, createBlog);
router.get("/api/get_blog/:blog_id", async (req, res) => {
  if (req.user) {
    console.log(req.user.id);
    res.send(await getBlog(parseInt(req.params.blog_id), req.user.id));
  } else res.send(await getBlog(parseInt(req.params.blog_id, null)));
});
router.delete("/api/delete_blog/:blog_id", isUserAuthenticated, deleteBlog);
router.get("/api/update_blog/:blogid", isUserAuthenticated, updateBlog);
router.post("/api/upload", isUserAuthenticated, upload);

router.get("/api/follow/:user_id", isUserAuthenticated, createFollow);

router.get("/api/react/view/:blog_id", isUserAuthenticated, createHistory);
router.get(
  "/api/react/upvote/:blog_id",
  isUserAuthenticated,
  async (req, res) => {
    await createUpvote(req, res);
    await deleteDownvote(req, res);
    const count = await countUpvote(parseInt(req.params.blog_id));
    res.json(count);
  }
);
router.get(
  "/api/react/downvote/:blog_id",
  isUserAuthenticated,
  async (req, res) => {
    await createDownvote(req, res);
    await deleteUpvote(req, res);
    const count = await countDownvote(parseInt(req.params.blog_id));
    res.json(count);
  }
);
router.get("/api/react/share/:blog_id", isUserAuthenticated, createShare);

router.post("/api/create_comment/:blog_id", isUserAuthenticated, createComment);
router.delete("/api/delete_comment", isUserAuthenticated, deleteComment);
export { router };
