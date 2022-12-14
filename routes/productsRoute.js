import express from "express"
import { productsController } from "../controllers/index.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", productsController.getAllProducts)
router.post("/", productsController.createNewProduct)
router.get("/:id", productsController.getProductById)
router.delete("/:id", productsController.deleteProductById)
router.patch("/:id", productsController.editProductById)

export default router