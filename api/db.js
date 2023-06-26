import mysql from "mysql";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_DB_PASSWORD,
    database: "elv",
})