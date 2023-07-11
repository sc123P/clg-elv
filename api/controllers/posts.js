import { db } from "../db.js";
import jwt from "jsonwebtoken";

export function getPosts (req, res, next){
    const q = req.query.category_id 
    ? "SELECT * FROM posts WHERE category_id=?" 
    : "SELECT * FROM posts";

    db.query(q, [req.query.category_id], (err, data)=>{
        if(err) return res.send(err)

        return res.status(200).json(data);
    });
};

export function getPost (req, res, next){
    //const q ="SELECT `username`, `title`, `desc`, p.img, `category`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ? "
    const q ="SELECT `uid`, `title`, `desc`, p.img AS postsImg, `category_id`, `date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id = ? "

    db.query(q,[req.params.id], (err, data)=>{
        if(err) return res.json(err);

        if (data.length === 0){
            return res.status(404).json({ message: "Publication inttrouvable." });
        }
        const post = data[0];

        //return res.status(200).json(data[0]);
        return res.status(200).json(post);
    });
};

export function addPost (req, res, next){

};

export function deletePost (req, res, next){
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Veuillez vous authentifier")

    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token invalide!")

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?"

        db.query(q,[postId, userInfo.id], (err, data)=>{
            if(err) return res.status(403).json("Vous ne pouvez supprimer que vos articles.")

            return res.json("L'article a été supprimé !");
        })
    })
};

export function updatePost (req, res, next){

};