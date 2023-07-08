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
import { getHistory } from "../controllers/history.js";
import { getFollowingBlogs } from "../controllers/follow.js";
import dotenv from "dotenv";

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
    failureMessage: "Cannot login to Google",
    successRedirect: successLoginUrl,
    failureRedirect: failureLoginUrl,
  }),
  (req, res) => {
    // res.send("LoggedIn");
  }
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

router.post("/api/create_user", createUser);
router.put("/api/update_user", isUserAuthenticated, updateUser);
router.delete("/api/delete_user", isUserAuthenticated, deleteUser);
router.get("/api/current_user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/api/home", getNewestBlogs);
router.get("/api/dashboard/:user_id", getUserProfile);
router.get("/api/following", isUserAuthenticated, getFollowingBlogs);
router.get("api/history", isUserAuthenticated, getHistory);

router.get("/api/create_blog", isUserAuthenticated, createBlog);
router.get("/api/get_blog/:blogId", getBlog);
router.delete("/api/delete_blog/:blogId", isUserAuthenticated, deleteBlog);
router.put("/api/update_blog/:blogId", isUserAuthenticated, updateBlog);
router.post("/api/upload", isUserAuthenticated, upload);
export { router };
