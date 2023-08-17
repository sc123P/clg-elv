import { db } from "../db.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import express from "express";



export function getCategories(req, res, next) {
  const q = "SELECT * FROM categories";
  
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    
    return res.status(200).json(data);
  });
}

export function getPosts(req, res, next) {
  //const page = req.query.page || 1;
  //const limit = req.query.limit || 5;
  
  const category_id = req.query.category_id;
  
  
  
  let q;
  let params;
  
  if (category_id) {
    //if (category) {
      q =
      //"SELECT * FROM posts JOIN post_categories ON posts.id = post_categories.post_id WHERE category_id=?";
      "SELECT * FROM posts JOIN post_categories ON posts.id = post_categories.post_id WHERE category_id=? ORDER BY date DESC";
      params = [category_id];
      //params = [category];
    } else {
      q = "SELECT * FROM posts ORDER BY date DESC";
      params = [];
    }
    
    db.query(q, params, (err, data) => {
      if (err) return res.status(500).send(err);
      
      return res.status(200).json(data);
    });
  }
  
  export function getCountPostsByCategory(category_id, callback) {
    const q = "SELECT COUNT(*) AS count FROM posts JOIN post_categories ON posts.id = post_categories.post_id WHERE category_id=?";
    const params = [category_id];
    
    db.query(q, params, (err, data) => {
      if (err) {
        return callback(err, null);
      }
      const count = data[0].count;
      return callback(null, count);
    });
  }
  
  
export function getPost (req, res, next){
    //const q ="SELECT `username`, `title`, `desc`, p.img, `category`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ? "
    //const q ="SELECT p.id, `uid`, `title`, `desc`, p.img AS postsImg, `category_id`, `date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id = ? "

    const q ="SELECT p.id, `uid`, `title`, `desc`, p.img AS postsImg, `date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id = ? "

    db.query(q,[req.params.id], (err, data)=>{
        if(err) return res.status(500).json(err);

        // if (data.length === 0){
        //     return res.status(404).json({ message: "Publication inttrouvable." });
        // }
        // const post = data[0];

        return res.status(200).json(data[0]);
        //return res.status(200).json(post);
    });
};

export function addPost(req, res, next) {
  // const app = express();
  // app.use(express.json());
  // const storage = multer.diskStorage({
  //   destination: function (req, file, cb) {
  //     // Indiquez ici l'emplacement où vous souhaitez enregistrer les fichiers téléchargés
  //     cb(null, './uploads/');

  //     //cb(null, '../client/public/upload');
  //   },
  //   filename: function (req, file, cb) {
  //     cb(null, Date.now() + file.originalname);
  //   }
  // });


  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Veuillez vous authentifier");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalide!");

    //const imgPaths = files.map((file) => `../client/public/upload/${file.filename}`);
    //const imgPaths = files.map((file) => `./uploads/${file.filename}`);
    const postValues = [
      req.body.title,
      req.body.desc,
      //req.body.img,
      req.body.img,
      //JSON.stringify(imgPaths),
      req.body.date,
      userInfo.id,
    ];

    console.log("postValues:", postValues);

    //const catIds = req.body.cat_ids;
    //const catIds = req.body.cat_id;
    //const selectedCategories = req.body.cat_id;
    const selectedCategories = req.body.category;
    console.log("selectedCategories:", selectedCategories);
    const insertPostQuery =
      "INSERT INTO `elv`.`posts`(`title`, `desc`, `img`, `date`, `uid`) VALUES (?) ";
      //"INSERT INTO `elv`.`posts`(`title`, `desc`, `date`, `uid`) VALUES (?) ";

    db.query(insertPostQuery, [postValues], (err, result) => {
      if (err) return res.status(500).json(err);

      const postId = result.insertId; // Récupérer l'ID de l'article inséré

      //if (catIds && catIds.length > 0) {
        if (selectedCategories && selectedCategories.length > 0) {
        // S'il y a des catégories sélectionnées
        const insertPostCategoriesQuery =
        "INSERT INTO `elv`.`post_categories`(`post_id`, `category_id`) VALUES (?, ?) ";
        //"INSERT INTO `elv`.`post_categories`(`post_id`, `category_id`) VALUES ? ";

        //for (const category of selectedCategories) {
        //  db.query(insertPostCategoriesQuery, [postId, category.value], (err, data) => {
        //    if (err) return res.status(500).json(err);
        //  });
        //}

        // ...

let counter = 0;
  for (const category of selectedCategories) {
    db.query(insertPostCategoriesQuery, [postId, category], (err, data) => {
      if (err) {
        // Gérer l'erreur ici si nécessaire
        if (!responseSent) {
          responseSent = true;
          return res.status(500).json(err);
        }
      } else {
        counter++;
        if (counter === selectedCategories.length) {
          // Toutes les requêtes ont été exécutées avec succès, renvoyer une seule réponse ici
          if (!responseSent) {
            responseSent = true;
            return res.json("Article créé");
          }
        }
      }
    });
  }

// ...

      

        // Créer un tableau de tuples pour insérer les associations post_id et category_id dans un seul INSERT
        //const postCategoriesValues = catIds.map((catId) => [postId, catId]);
        //const postCategoriesValues = selectedCategories.map((catId) => [postId, catId]);

        //const postCategoriesValues = selectedCategories.map((category_id) => [postId, category_id.value]);

        //const postCategoriesValues = selectedCategories.map((category) => [postId, category.value]);
        const postCategoriesValues = selectedCategories.map((category) => [postId, category]);


        console.log("postCategoriesValues:", postCategoriesValues); // Ajoutez cette ligne pour afficher les valeurs de postCategoriesValues

        //db.query(insertPostCategoriesQuery, [postCategoriesValues], (err, data) => {
          //db.query(insertPostCategoriesQuery, postCategoriesValues, (err, data) => {
          //if (err) return res.status(500).json(err);
          //return res.json("Article créé");
        //});
        let responseSent = false; // Ajoutez cette variable en haut de votre fonction

db.query(insertPostCategoriesQuery, [postCategoriesValues], (err, data) => {
  if (err) {
    if (!responseSent) {
      responseSent = true;
      return res.status(500).json(err);
    }
  } else {
    if (!responseSent) {
      responseSent = true;
      return res.json("Article créé");
    }
  }
});
      } else {
        // Aucune catégorie sélectionnée, l'article sera simplement publié sans catégorie associée
        return res.json("Article créé sans catégorie");
      }
    });
  });
}




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
  const token = req.cookies.access_token
    if(!token) return res.status(401).json("Veuillez vous authentifier")

    jwt.verify(token, "jwtkey", (err, userInfo)=>{
        if(err) return res.status(403).json("Token invalide!")

        const postId = req.params.id
        const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `category_id`=? WHERE `id` = ? AND `uid` = ? "
        const values = [
          req.body.title,
          req.body.desc,
          req.body.img,
          userInfo.id,
          req.body.category_id,
        ]

        db.query(q, [...values, postId, userInfo.id], (err, data)=>{
          if(err) return res.status(500).json(err);
          return res.json("Article modifié")
        })
    })
};