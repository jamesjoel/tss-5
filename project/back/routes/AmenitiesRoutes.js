import express from 'express'
import {SaveAmenities, UpdateAmenities, DelteAmenities, GetAllAmenities, GetAmenitiesById} from '../controllers/AmenitiesController.js'
import IsAdminLoggedIn from '../auth/IsAdminLoggedIn.js';
const routes = express.Router();

routes.get("/", GetAllAmenities)
routes.get("/:id", GetAmenitiesById)


routes.post("/", IsAdminLoggedIn, SaveAmenities)
routes.put("/:id", IsAdminLoggedIn, UpdateAmenities)
routes.delete("/:id", IsAdminLoggedIn, DelteAmenities)

export default routes;