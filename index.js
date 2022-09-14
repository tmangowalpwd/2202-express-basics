import express from "express"
import { logMiddleware } from "./middlewares/logMiddleware.js"
import { productsRoute } from "./routes/index.js"
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT
const app = express()

app.use(express.json())
app.use(logMiddleware)

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my API</h1>")
})

app.use("/products", productsRoute)

// name, email, password
// 1. get all employees
// 2. create employee
// 3. delete employee
// 4. edit employee


app.listen(PORT, () => {
  console.log("API listening in port", PORT)
})

