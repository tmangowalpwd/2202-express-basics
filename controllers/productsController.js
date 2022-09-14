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
  },
  createNewProduct: (req, res) => {
    let newProduct = {
      ...req.body,
      id: productData[productData.length - 1].id + 1,
    }

    productData.push(newProduct)

    return res.status(200).json({
      message: "Product added!",
      data: productData[productData.length - 1],
    })
  },
  getProductById: (req, res) => {
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
  },
  deleteProductById: (req, res) => {
    const { id } = req.params

    for (let i = 0; i < productData.length; i++) {
      if (productData[i].id == id) {
        productData.splice(i, 1)
        return res.status(200).json({
          message: "Product deleted",
        })
      }
    }

    return res.status(404).json({
      message: "Product not found",
    })
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

