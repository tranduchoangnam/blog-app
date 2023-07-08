import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { createBlog } from "../controllers/blog.js";
//handle uploaded files
const dirPath = `./uploads/${uuidv4()}`;
const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    await fs.promises.mkdir(dirPath, { recursive: true });
    cb(null, dirPath);
  },
  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf-8"
    );
    cb(null, file.originalname);
  },
});
const uploadFile = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 2MB
}).single("photo");

const upload = (req, res) => {
  uploadFile(req, res, async function (err) {
    // console.log(req.user);
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      res
        .status(500)
        .send({ error: { message: `Multer uploading error: ${err.message}` } })
        .end();
      return;
    } else if (err) {
      // An unknown error occurred when uploading.
      if (err.name == "ExtensionError") {
        res
          .status(413)
          .send({ error: { message: err.message } })
          .end();
      } else {
        res
          .status(500)
          .send({
            error: { message: `unknown uploading error: ${err.message}` },
          })
          .end();
      }
      return;
    }

    // Everything went fine.
    // processresult
    const relativePath = path.relative(process.cwd(), req.file.path);
    const data = {
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      photo: `${process.env.BACKEND_URL}/${relativePath}`,
      userId: req.user.id,
    };
    await createBlog(data);
  });
};
export default upload;
