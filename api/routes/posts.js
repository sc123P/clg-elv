import express from "express";
import { 
    getPosts, 
    getPost,
    addPost,
    deletePost,
    updatePost,
    getCategories,

} from "../controllers/posts.js";

const router = express.Router();

router.get('/categories', getCategories);
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);
//router.update('/:id', updatePost);

export default router