import mysql from "mysql"
import dotenv from "dotenv"

dotenv.config()

const db = mysql.createConnection({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  port: process.env.MYSQL_PORT,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: false,
})

export default db
