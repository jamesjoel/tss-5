import express from 'express';
import {SaveProduct, GetAllProduct, UpdateProductById, GetAllProductById, DeleteProductById} from '../controllers/ProductController.js'
const routes = express.Router();

routes.get("/", GetAllProduct)
routes.get("/:id", GetAllProductById)
routes.post("/", SaveProduct)
routes.delete("/:id", DeleteProductById)
routes.put("/:id", UpdateProductById)

export default routes;

