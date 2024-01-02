import dotenv from "dotenv";
dotenv.config();
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import bcrypt from "bcrypt";
const app = express();
app.use(express.urlencoded({ extended: true }));
// init database
import "../src/dbs/init.mongodb.js";

import fileModel from "./model/file.model.js";

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);
const upload = multer({ dest: "uploads" });

// app.use("/static", express.static(path.join(__dirName, "views")));
app.set("views", path.join(__dirName, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };
  if (req.body.password != null && req.body.password !== "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }

  const file = await fileModel.create(fileData);

  res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` });
});

app.route("/file/:id").get(handleDownload).post(handleDownload);

async function handleDownload(req, res) {
  const file = await fileModel.findById(req.params.id);

  if (file.password != null) {
    if (req.body.password == null) {
      res.render("password");
      return;
    }
    if (!(await bcrypt.compare(req.body.password, file.password))) {
      res.render("password", { error: true });
      return;
    }
  }

  file.downloadCount++;
  await file.save();

  console.log(file.downloadCount);

  res.download(file.path, file.originalName);
}

export default app;
