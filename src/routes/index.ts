import { Router } from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  uploadFile,
  uploadDataToDb,
  dashboardData,
  login,
  register,
} from "../controller/index.js";

const router = Router();

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb: any) => {
    // Delete existing files
    const files = fs.readdirSync(uploadDir);

    files.forEach((fileName) => {
      fs.unlinkSync(path.join(uploadDir, fileName));
    });

    cb(null, uploadDir);
  },

  filename: (req, file: any, cb: any) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", (req, res) => res.send("Server is running on port 3000"));

router.post("/upload", upload.single("file"), uploadDataToDb);

router.get("/dashboard", dashboardData);

router.post("/login", login);

router.post("/register", register);

export default router;
