import express from "express"

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

app.get("/", (req, res) => {
  res.send("Welcome to my API")
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

    return res.send(filtered)
  }

  return res.send(productData)
})

app.post("/products", (req, res) => {
  let newProduct = {
    ...req.body,
    id: productData[productData.length - 1].id + 1
  }

  productData.push(newProduct)

  res.send("Product added!")
})

app.get("/products/:id", (req, res) => {
  // req.params.id -> string

  for (let product of productData) {
    if (product.id == req.params.id) {
      return res.send(product)
    }
  }

  return res.status(404).send("Product not found")
})

app.delete("/products/:id", (req, res) => {
  const { id } = req.params

  for (let i = 0; i < productData.length; i++) {
    if (productData[i].id == id) {
      productData.splice(i, 1)
      return res.send("Product deleted")
    }
  }

  return res.send("Product not found")
})

// Buat endpoint
// 1. POST /products => Tambahin product beserta dengan id yang 
//                      generate secara otomatis
// let newProduct = { ...req.body, id: productData[terakhir].id + 1 }
// 2. GET /products/:id => Get product berdasarkan ID, kirim 1 obj saja
//                         sebagai response
// 3. DELETE /products/:id => Hapus product berdasarkan ID
// 4. GET /products => Bikin supaya bisa terima query params "product_name"
//                     dan filter data berdasarkan "product_name"

app.listen(PORT, () => {
  console.log("API listening in port", PORT)
})
