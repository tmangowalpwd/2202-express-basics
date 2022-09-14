import express from "express"
import { authMiddleware } from "./middlewares/authMiddleware.js"
import { logMiddleware } from "./middlewares/logMiddleware.js"

const PORT = 2000
const app = express()

const productData = [
  {
    id: 1,
    product_name: "Jeruk",
    price: 5000,
  },
  {
    id: 2,
    product_name: "Leci",
    price: 3000,
  },
  {
    id: 3,
    product_name: "Mangga",
    price: 10000,
  },
]

app.use(express.json())
app.use(logMiddleware)

app.get("/", (req, res) => {
  res.send("<h1>Welcome to my API</h1>")
})

app.get("/products", (req, res) => {
  const { product_name } = req.query

  if (product_name) {
    const filtered = []

    productData.forEach((val) => {
      if (val.product_name === product_name) {
        filtered.push(val)
      }
    })

    return res.status(200).json({
      message: "Get all products",
      data: filtered,
    })
  }

  return res.status(200).json({
    message: "Get all products",
    data: productData,
  })
})

app.post("/products", authMiddleware, (req, res) => {
  let newProduct = {
    ...req.body,
    id: productData[productData.length - 1].id + 1,
  }

  productData.push(newProduct)

  return res.status(200).json({
    message: "Product added!",
    data: productData[productData.length - 1],
  })
})

app.get("/products/:id", (req, res) => {
  // req.params.id -> string

  for (let product of productData) {
    if (product.id == req.params.id) {
      return res.status(200).json({
        message: "Get product by ID",
        data: product,
      })
    }
  }

  return res.status(404).json({
    message: "Product not found",
  })
})

app.delete("/products/:id", authMiddleware, (req, res) => {
  const { id } = req.params

  for (let i = 0; i < productData.length; i++) {
    if (productData[i].id == id) {
      productData.splice(i, 1)
      return res.status(200).json({
        message: "Product deleted"
      })
    }
  }

  return res.status(404).json({
    message: "Product not found",
  })
})

app.listen(PORT, () => {
  console.log("API listening in port", PORT)
})
