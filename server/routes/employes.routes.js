import { Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controllers/allControllers.js";

const router = Router()

router.get('/products', getProducts)
router.get('/products/:id', getProduct)
router.post('/products', createProduct)
router.put('/products/:id', updateProduct)
router.delete('/products/:id', deleteProduct)

export default router