import mysql from "mysql2"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "5030Steves#Database?",
    database: "stevedb"
})