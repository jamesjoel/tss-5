import express from 'express'
import {SaveCuisine, GetCuisine, GetCuisineById, UpdateCuisine, DeleteCuisine} from '../controllers/CuisineController.js'
const routes = express.Router();

routes.get("/", GetCuisine);
routes.get("/:id", GetCuisineById);
routes.post("/", SaveCuisine);
routes.put("/:id", UpdateCuisine);
routes.delete("/:id", DeleteCuisine);

export default routes;

