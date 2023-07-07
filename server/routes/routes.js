import express from "express";
const router = express.Router();
import passport from "passport";
import upload_process from "../services/upload_process.js";
import isUserAuthenticated from "../middlewares/checkAuth.js";
import history from "../services/history.js";

import dotenv from "dotenv";
dotenv.config();
const a = 2;
const successLoginUrl = `${process.env.FRONTEND_URL}/login/success`;
const failureLoginUrl = `${process.env.FRONTEND_URL}/login/error`;

router.post("/upload", isUserAuthenticated, upload_process);

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
  }),
  (req, res) => {
    res.send("LoggedIn");
  }
);
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    authType: "reauthenticate",
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/api/current_user",
    failureRedirect: "/auth/facebook/failure",
  })
);
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
router.get("/api/current_user", isUserAuthenticated, (req, res) => {
  res.json(req.user);
});

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
router.get("/auth/facebook/failure", (req, res) => {
  res.send("Failed to authenticate..");
});
router.get("/api/getHistory", isUserAuthenticated, history.getHistory);
export { router };
