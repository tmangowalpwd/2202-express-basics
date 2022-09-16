import db from "../db/index.js"

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

const productsController = {
  getAllProducts: (req, res) => {
    try {
      let sql = "SELECT * FROM products;"

      const { product_name } = req.query

      if (product_name) {
        sql = `SELECT * FROM products WHERE product_name = "${product_name}";`
      }

      db.query(sql, (err, result) => {
        if (err) throw err

        return res.status(200).json({
          message: "Get all products",
          data: result,
        })
      })
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  createNewProduct: (req, res) => {
    try {
      let sql = `INSERT INTO products (product_name, price, stock) VALUES 
      (?, ?, ?)`

      // Raw query
      // Query Builder (QB)
      // Object Relational Mapping

      db.query(
        sql,
        [req.body.product_name, req.body.price, req.body.stock],
        (err) => {
          if (err) throw err

          return res.status(201).json({
            message: "Product created",
          })
        }
      )
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  getProductById: (req, res) => {
    try {
      const { id } = req.params
      let sql = `SELECT * FROM products WHERE id = ?`

      db.query(sql, [id], (err, result) => {
        if (err) throw err

        return res.status(200).json({
          message: "Get product by ID",
          data: result[0],
        })
      })
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      })
    }
  },
  deleteProductById: (req, res) => {
    try {
      const { id } = req.params

      let sql = `DELETE FROM products WHERE id = ?`

      db.query(sql, [id], (err) => {
        if (err) throw err

        return res.status(200).json({
          message: "Product deleted"
        })
      })
    } catch (err) {
      return res.status(500).json({
        message: "Server error"
      })
    }
  },
  editProductById: (req, res) => {
    const { id } = req.params

    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id == id) {
        productData[i] = {
          ...productData[i],
          ...req.body,
        }

        return res.status(200).json({
          message: "Product edited",
          data: productData[i],
        })
      }
    }

    return res.status(404).json({
      message: "Product not found",
    })
  },
}

export default productsController

