import express from "express";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import paginationRoutes from "./routes/pagination.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.use(cors());
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
  return res.status(200).json(file.filename);
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/page', paginationRoutes);

export default app