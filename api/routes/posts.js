import express from "express";
import { 
    getPosts, 
    getPost,
    addPost,
    deletePost,
    updatePost,
    getCategories,
    getPostsBySubcategory,
    getLatestPost,
    //getCountPostsByCategory,

} from "../controllers/posts.js";

const router = express.Router();

//router.get('/countPostsByCategory', getCountPostsByCategory);

router.get('/categories', getCategories);
router.get('/', getPosts);
router.get('/latest', getLatestPost);
router.get('/subcat', getPostsBySubcategory);
router.get('/:id', getPost);
router.post('/', addPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

export default router