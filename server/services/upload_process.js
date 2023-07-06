import multer from "multer";
import fetch from "node-fetch";
import fs from "fs";
import fsx from "fs-extra";
import { v4 as uuidv4 } from "uuid";
import history from "./history.js";
import path from "path";

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

const multi_upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
}).array("uploadedCVs", 100); //100files

const upload_process = (req, res) => {
  multi_upload(req, res, async function (err) {
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
    try {
      let submitList = [];
      const promises = req.files.map(async (file) => {
        //call to AI server for pdf loading (python library extract pdf content better than nodejs library)
        const response = await fetch("http://0.0.0.0:8080/api/loadPdf", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: `${path.resolve(file.path)}`,
          }), // Pass the JSON string as the request body
          cache: "default",
        });

        const data = await response.json();
        //data[0]: name, data[1]: phone, data[2]:fileText

        submitList.push([file.filename, data[0], data[1]]);
        // console.log(file.filename);
        return JSON.stringify(data[2]);
      });

      Promise.all(promises).then(async (arrayData) => {
        try {
          // Remove the directory and all its contents
          await fsx.remove(dirPath);
          // console.log(`Successfully removed directory: ${dirPath}`);
        } catch (err) {
          console.error(err);
        }
        // Serialize the request body into JSON
        const body = JSON.stringify({
          des: req.body.description,
          inf: arrayData,
        });

        const response = await fetch("http://0.0.0.0:8080/predict", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: body, // Pass the JSON string as the request body
          cache: "default",
        });
        // console.log(response);
        const json = await response.json();
        console.log(submitList);

        const result = json.sorted.map((index, i) => ({
          filename: submitList[index][0],
          Email: submitList[index][1],
          Phone: submitList[index][2],
          rating: json.similarity[i],
        }));
        // result.sort((a, b) => b.rating - a.rating); for sorting purpose

        // save history to DB
        await history.saveHistory(
          req.user.userId,
          req.body.description,
          arrayData,
          JSON.stringify(result)
        );
        console.log(result);

        res.json(result);
      });
    } catch (err) {
      console.log(err);
    }
  });
};
export default upload_process;
