import mysql from "mysql2";
import dotenv from "dotenv";
//import mysql from "mysql";

dotenv.config();

export const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données:", err);
    } else {
        console.log("Connexion à la base de données établie avec succès!");
    }
});