import express from "express";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//import dotenv from "dotenv";
//const postRoutes = require('./routes/posts');
const app = express();

//dotenv.config();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-with, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(cookieParser());


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, "../api/upload");
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

  app.post("/api/upload", upload.single('file'), function (req, res) {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
    return;
  }
  //return res.status(200).json(files);
  return res.status(200).json(file.filename);
});
//NOUVEAU CHANGEMENT


//app.use('/api/upload', express.static(path.join(__dirname, "../client/public/upload")));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

export default app
//module.exports = app;