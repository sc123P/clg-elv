import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function signup (req, res, next){

    //CHECK EXISTING USER
    // const q = "SELECT * FROM elv.user WHERE email = ? OR username = ? "
    const checkExistingAdminQuery = "SELECT * FROM elv.user WHERE isAdmin = 1";

    // db.query(q,[req.body.email, req.body.username], (err, data)=>{
        db.query(checkExistingAdminQuery, (err, data) => {
        //bcrypt.hash(req.body.password, 10)

        if(err) return res.json(err)
        // if(data.length) return res.status(409).json("Cet utilisateur existe déjà");
    
        // Si un administrateur existe déjà, empêche la création d'un autre compte
        if (data.length > 0) {
            return res.status(409).json("Création de nouveaux utilisateurs interdit");
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // const q = "INSERT INTO user(`username`, `email`, `password`, `isAdmin`) VALUES (?)"
        // const values = [
        //     req.body.username,
        //     req.body.email,
        //     hash,
        //     true,
        // ]

        // Autorise la création d'un compte administrateur
    if (req.body.username === 'admin') {
        const insertUserQuery = "INSERT INTO user(`username`, `email`, `password`, `isAdmin`) VALUES (?)";
        const values = [
          req.body.username,
          req.body.email,
          hash,
          true, // Le compte est administrateur
        ];

        db.query(insertUserQuery, [values], (err, data) => {
            if (err) return res.json(err);
            return res.status(200).json("Compte administrateur créé");
          });
        } else {
          // Empêche la création de comptes non-administrateurs
          return res.status(409).json("La création de nouveaux utilisateurs est interdite");
        }

        // db.query(q, [values], (err, data)=>{
        //     if (err) return res.json(err);
        //     return res.status(200).json("Utilisateur créé");
        // })
        });
    // }
    // });
};

export function login (req, res, next){
    //CHECK USER
    const q = "SELECT * FROM user WHERE username = ?"

    db.query(q, [req.body.username], (err, data) =>{
        if(err) return res.json(err);
        if(data.length === 0) return res.status(404).json("Utilisateur introuvable.");

        //CHECK PASSWORD
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

        if(!isPasswordCorrect) 
            return res.status(400).json("Pseudo ou mot de passe erroné.");
        
        const token = jwt.sign({id: data[0].id}, "jwtkey");
        const {password, ...other} = data[0]

        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200).json(other);
    });
};

export function logout (req, res){
    res.clearCookie("access_token",{
        sameSite: "none",
        secure: true
    }).status(200).json("Utilisateur déconnecté.")
};