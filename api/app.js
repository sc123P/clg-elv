import express from "express";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";

import paginationRoutes from "./routes/pagination.js";

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


// //CHANGEMENT PAGINATION--------------------------------------------------------------
// app.get("/api/paginatedUsers", async (req, res, next) => {
// //app.get("/api/paginatedUsers?page=${page}&limit=${limit}", async  (req, res, next) => {
//   //const allUser = await User.find({});
//   const page = parseInt(req.query.page)
//   const limit = parseInt(req.query.limit)

//   const startIndex = (page - 1) * limit
//   const lastIndex = (page) * limit

//   // const results = {}
//   // results.totalUser=allUser.length;
//   // results.pageCount=Math.ceil(allUser.length/limit);

//   try {
//     const allUser = await User.find({});
//     const results = {
//       totalUser: allUser.length,
//       pageCount: Math.ceil(allUser.length / limit),
//       result: allUser.slice(startIndex, lastIndex),
//     };

//   if (lastIndex < allUser.length) {
//     results.next = {
//       page: page + 1,
//     }
//   }
//   if (startIndex > 0) {
//     results.prev = {
//       page: page - 1,
//     }
//   }
//   //results.result = allUser.slice(startIndex, lastIndex);
//   res.json(results)
// } catch(error){
//   res.status(500).json({ error: "Une erreur s'est produite" });
// }
// });
// //CHANGEMENT PAGINATION--------------------------------------------------------------

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

app.use('/api/page', paginationRoutes);

export default app
//module.exports = app;