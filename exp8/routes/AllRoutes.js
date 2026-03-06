import express from 'express'
import ProductRoutes from './ProductRoutes.js'
const routes = express.Router();

routes.use("/api/v1/product", ProductRoutes);

export default routes;