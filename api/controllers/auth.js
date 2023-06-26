//const { db } = require("../db");
import { db } from "../db";
import bcrypt from "bcryptjs";
//const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) =>{

    //CHECK EXISTING USER
    const q = "SELECT * FROM elv.user WHERE email = ? OR username = ? "

    db.query(q,[req.body.email, req.body.username], (err, data)=>{
        //bcrypt.hash(req.body.password, 10)

        if(err) return res.json(err)
        if(data.length) return res.status(409).json("Cet utilisateur n'existe pas");

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user(`username`, `email`, `password`) VALUES (?)"
        const values = [
            req.body.username,
            req.body.email,
            hash,
        ]

        db.query(q, [values], (err, data)=>{
            if (err) return res.json(err);
            return res.status(200).json("Utilisateur créé");
        })
    });
};