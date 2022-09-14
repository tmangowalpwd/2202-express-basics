import express from "express"
import { productsController } from "../controllers/index.js"
import { authMiddleware } from "../middlewares/authMiddleware.js"

const router = express.Router()

router.get("/", productsController.getAllProducts)
router.post("/", authMiddleware, productsController.createNewProduct)
router.get("/:id", productsController.getProductById)
router.delete("/:id", authMiddleware, productsController.deleteProductById)

export default router