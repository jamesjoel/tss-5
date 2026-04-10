import express from 'express'
import {SaveAmenities, UpdateAmenities, DelteAmenities, GetAllAmenities, GetAmenitiesById} from '../controllers/AmenitiesController.js'
const routes = express.Router();

routes.get("/", GetAllAmenities)
routes.get("/:id", GetAmenitiesById)
routes.post("/", SaveAmenities)
routes.put("/:id", UpdateAmenities)
routes.delete("/:id", DelteAmenities)

export default routes;