import express from "express";
import session from "express-session";
import http from "http";
import passport from "passport";
import { router } from "./routes/routes.js";
import cookieParser from "cookie-parser";
// import keys from "./auth/key.js";
import middlewares from "./middlewares/errors.js";
// import cookieSession from "cookie-session";
import cors from "cors";
import "./auth/passport.js";
const app = express();
const port = process.env.PORT || 8000;
// app.set("trust proxy", 1);

const server = http.createServer(app);

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "https://neural-cv.vercel.app");
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

app.use(passport.initialize());
app.use(passport.session());
app.use(router);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port} ...`);
});

process.on("SIGINT", () => {
  console.log("🤖 Server closed");
});
