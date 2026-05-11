import express from 'express'
import {SaveAmenities, GetAmenities, GetAmenitiesById, UpdateAmenities, DeleteAmenities} from '../controllers/AmenitiesController.js'
const routes = express.Router();

routes.get("/", GetAmenities);
routes.get("/:id", GetAmenitiesById);
routes.post("/", SaveAmenities);
routes.put("/:id", UpdateAmenities);
routes.delete("/:id", DeleteAmenities);

export default routes;

