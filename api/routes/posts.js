import express from "express";
//import postsCtrl from '../controllers/posts.js';

const router = express.Router();

router.get('/test', (req, res) =>{
    res.json("Là c'est bueno !!!!")
});

export default router