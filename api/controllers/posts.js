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
  const category_id = req.query.category_id;
  let q;
  let params;
  
  if (category_id) {
      q =
      `
      SELECT p.*
      FROM posts p
      JOIN post_categories pc ON p.id = pc.post_id
      JOIN categories c ON pc.category_id = c.id
      WHERE c.id = ? OR c.parent_category_id = ?
      ORDER BY p.date DESC
    `;

      // params = [category_id];
      params = [category_id, category_id];
    } else {
      q = "SELECT * FROM posts ORDER BY date DESC";
      params = [];
    }
    
    db.query(q, params, (err, data) => {
      if (err) return res.status(500).send(err);
      
      return res.status(200).json(data);
    });
  }

export function getPostsBySubcategory(req, res, next) {
  const subcategory = req.query.subcategory;

  // Utilise la valeur de la sous-catégorie pour récupérer les articles
  const q = `
    SELECT p.*
    FROM posts p
    JOIN post_categories pc ON p.id = pc.post_id
    JOIN categories c ON pc.category_id = c.id
    WHERE c.category = ?
    ORDER BY date DESC`;

    console.log('Subcategory:', subcategory);

  db.query(q, [subcategory], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
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
    const q ="SELECT p.id, `uid`, `title`, `desc`, p.img AS postsImg, `date` FROM user u JOIN posts p ON u.id=p.uid WHERE p.id = ? "

    db.query(q,[req.params.id], (err, data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
};

export function getLatestPost(req, res, next) {
  let params;
  const q = `
    SELECT *
    FROM posts
    ORDER BY date DESC
    LIMIT 1
  `;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data === null) return res.status(404).json({ message: "No posts found." });

    return res.status(200).json(data[0]);
  });
}


export function addPost(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Veuillez vous authentifier");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalide!");

    const postValues = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.date,
      userInfo.id,
    ];

    console.log("postValues:", postValues);

    const selectedCategories = req.body.category;
    console.log("selectedCategories:", selectedCategories);
    const insertPostQuery =
      "INSERT INTO `elv`.`posts`(`title`, `desc`, `img`, `date`, `uid`) VALUES (?) ";

    db.query(insertPostQuery, [postValues], (err, result) => {
      if (err) return res.status(500).json(err);

      const postId = result.insertId; // Récupérer l'ID de l'article inséré

        if (selectedCategories && selectedCategories.length > 0) {
        // S'il y a des catégories sélectionnées
        const insertPostCategoriesQuery =
        "INSERT INTO `elv`.`post_categories`(`post_id`, `category_id`) VALUES (?, ?) ";

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

      

        
        const postCategoriesValues = selectedCategories.map((category) => [postId, category]);


        console.log("postCategoriesValues:", postCategoriesValues); // Ajoutez cette ligne pour afficher les valeurs de postCategoriesValues
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

// export function updatePost (req, res, next){
//   const token = req.cookies.access_token
//     if(!token) return res.status(401).json("Veuillez vous authentifier")

//     jwt.verify(token, "jwtkey", (err, userInfo)=>{
//         if(err) return res.status(403).json("Token invalide!")

//         const postId = req.params.id
//         // const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `category_id`=? WHERE `id` = ? AND `uid` = ? "
//         const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `category_id`=? WHERE `id` = ? AND `uid` = ? "
//         const values = [
//           req.body.title,
//           req.body.desc,
//           req.body.img,
//           userInfo.id,
//           req.body.category_id,
//         ]

//         db.query(q, [...values, postId, userInfo.id], (err, data)=>{
//           if(err) return res.status(500).json(err);
//           return res.json("Article modifié")
//         })
//     })
// };


export function updatePost(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Veuillez vous authentifier");

  jwt.verify(token, "jwtkey", (err, userInfo) => {
    if (err) return res.status(403).json("Token invalide!");

    const postId = req.params.id;
    const newCategoryId = req.body.category_id;
    const newTitle = req.body.title;
    const newDesc = req.body.desc;
    const newImg = req.body.img;

    // Vérification de l'uid
    const checkPermissionQuery = "SELECT * FROM posts WHERE `id` = ? AND `uid` = ?";
    db.query(checkPermissionQuery, [postId, userInfo.id], (err, permissionData) => {
      if (err) return res.status(500).json(err);

      if (permissionData.length === 0) {
        return res.status(403).json("Vous ne pouvez pas modifier cet article.");
      }

      // Maj de la catégorie dans la table post_categories
      const updateCategoryQuery =
        "UPDATE post_categories SET `category_id` = ? WHERE `post_id` = ?";

      db.query(updateCategoryQuery, [newCategoryId, postId], (err, updateCategoryData) => {
        if (err) return res.status(500).json(err);

        // Maj des autres champs de l'article dans la table posts
        const updatePostQuery =
          "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ? WHERE `id` = ?";

        db.query(updatePostQuery, [newTitle, newDesc, newImg, postId], (err, updatePostData) => {
          if (err) return res.status(500).json(err);

          return res.json("Article modifié avec succès.");
        });
      });
    });
  });
}
