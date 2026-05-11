import express from 'express'
import CityRoutes from './CityRoutes.js'
import UserRoutes from './UserRoutes.js'
import CuisineRoutes from './CuisineRoutes.js'
import AmenitiesRoutes from './AmenitiesRoutes.js'
import HotelsRoutes from './HotelRoutes.js'
const routes = express.Router();

routes.use("/api/v1/city", CityRoutes)
routes.use("/api/v1/user", UserRoutes)
routes.use("/api/v1/cuisine", CuisineRoutes)
routes.use("/api/v1/amenities", AmenitiesRoutes)
routes.use("/api/v1/hotels", HotelsRoutes)

export default routes;