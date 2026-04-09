import express from 'express'
import {SaveCus, UpdateCus, DelteCus, GetAllCus, GetCusById} from '../controllers/CuisineController.js'
const routes = express.Router();

routes.get("/", GetAllCus)
routes.get("/:id", GetCusById)
routes.post("/", SaveCus)
routes.put("/:id", UpdateCus)
routes.delete("/:id", DelteCus)

export default routes;