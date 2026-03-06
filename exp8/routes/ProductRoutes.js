import express from 'express';
import {SaveProduct, GetAllProduct, GetAllProductById} from '../controllers/ProductController.js'
const routes = express.Router();

routes.get("/", GetAllProduct)
routes.get("/:a", GetAllProductById)
routes.post("/", SaveProduct)

export default routes;

