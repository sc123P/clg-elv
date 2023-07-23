import express from "express";
import authRoutes from "./routes/auth.js";
import postsRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";
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

//const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//      cb(null, '../client/public/upload')//
//    },
//    filename: function (req, file, cb) {
//      cb(null, Date.now()+file.originalname)
//    }
//  })
//const upload = multer({ storage })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../client/public/upload");
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

//const upload = multer({ storage });

//const upload = multer({ dest: './uploads/' });

//const upload = multer({ storage });
//app.post('/api/upload', upload.array('file', 12), function (req, res) {
//  const file = req.files;
//  if (!req.file) {
    // Le fichier n'a pas été correctement téléchargé
//    res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
//    return;
//  }
  //const file = req.file;
//  return res.status(200).json(file);
//});

const upload = multer({ storage }).array('file', 12);
app.post('/api/posts/upload', upload, function (req, res) {
  const file = req.files; // Correction ici : Utilisez req.files au lieu de req.file
  if (!file) {
    // Le fichier n'a pas été correctement téléchargé
    res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
    return;
  }
  return res.status(200).json(file);
});


app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);

export default app
//module.exports = app;