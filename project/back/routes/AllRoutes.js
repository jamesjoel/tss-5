import express from 'express'
import CityRoutes from './CityRoutes.js'
import UserRoutes from './UserRoutes.js'
import CuisineRoutes from './CuisineRoutes.js'

let routes = express.Router();

routes.use("/api/v1/city", CityRoutes)
routes.use("/api/v1/user", UserRoutes)
routes.use("/api/v1/cuisine", CuisineRoutes)

export default routes;