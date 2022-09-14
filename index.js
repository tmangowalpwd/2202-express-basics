import express from "express"
import productsController from "./controllers/productsController.js"
import { authMiddleware } from "./middlewares/authMiddleware.js"
import { logMiddleware } from "./middlewares/logMiddleware.js"

const PORT = 2000
const app = express()

app.use(express.json())
app.use(logMiddleware)

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my API</h1>")
})

app.get("/products", productsController.getAllProducts)
app.post("/products", authMiddleware, productsController.createNewProduct)
app.get("/products/:id", productsController.getProductById)
app.delete("/products/:id", authMiddleware, productsController.deleteProductById)

app.listen(PORT, () => {
  console.log("API listening in port", PORT)
})

