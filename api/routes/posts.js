import express from "express";
import { 
    getPosts, 
    getPost,
    addPost,
    deletePost,
    updatePost,
    getCategories,
    //getCountPostsByCategory,

} from "../controllers/posts.js";

// import multer from 'multer';
// import path from 'path';

const router = express.Router();


// // Configurer le stockage des fichiers téléchargés
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Spécifiez l'emplacement où vous souhaitez enregistrer les fichiers téléchargés
//     cb(null, '../client/public/upload');
//     //cb(null, '../api/uploads');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// router.post('/upload', upload.array('files', 12), function (req, res, next) {
//   const files = req.files;
//   if (!files || files.length === 0) {
//     // Aucun fichier n'a été correctement téléchargé
//     return res.status(400).json({ error: 'Aucun fichier n\'a été téléchargé.' });
//   }

//   // Ici, vous pouvez traiter les fichiers téléchargés si nécessaire

//   // Enregistrez les noms de fichiers téléchargés dans un tableau
//   const fileNames = files.map(file => file.filename);

//   // Répondez avec les noms de fichiers téléchargés
//   return res.status(200).json({ files: fileNames });
// });

//router.get('/countPostsByCategory', getCountPostsByCategory);

router.get('/categories', getCategories);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router