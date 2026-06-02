import express from 'express'
import CityRoutes from './CityRoutes.js'
import UserRoutes from './UserRoutes.js'
import CuisineRoutes from './CuisineRoutes.js'
import AmenitiesRoutes from './AmenitiesRoutes.js'
import HotelsRoutes from './HotelRoutes.js'
import UserAuthRoutes from './UserAuthRoute.js'
import AdminAuthRoutes from './AdminAuthRoutes.js'
import UserProfileRoutes from './UserProfileRoutes.js'
import SecuredUserApi from '../util/SecuredUserApi.js'
const routes = express.Router();

routes.use("/api/v1/city", CityRoutes)
routes.use("/api/v1/user", UserRoutes)
routes.use("/api/v1/cuisine", CuisineRoutes)
routes.use("/api/v1/amenities", AmenitiesRoutes)
routes.use("/api/v1/hotels", HotelsRoutes)
routes.use("/api/v1/userauth", UserAuthRoutes)
routes.use("/api/v1/adminauth", AdminAuthRoutes)

routes.use("/api/v1/profile", SecuredUserApi, UserProfileRoutes)


export default routes;