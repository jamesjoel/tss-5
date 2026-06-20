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
import MailRoutes from './MailRoutes.js'
import HotelDetailRoutes from './HotelDetailRoutes.js'
import RatingRoutes from './RatingRoutes.js'
import DonationRoutes from './DonationRoutes.js'
import HotelFilterRoutes from './HotelFilterRoutes.js'
const routes = express.Router();

routes.use("/api/v1/city", CityRoutes)
routes.use("/api/v1/user", UserRoutes)
routes.use("/api/v1/cuisine", CuisineRoutes)
routes.use("/api/v1/amenities", AmenitiesRoutes)
routes.use("/api/v1/hotels", HotelsRoutes)
routes.use("/api/v1/userauth", UserAuthRoutes)
routes.use("/api/v1/adminauth", AdminAuthRoutes)
routes.use("/api/v1/mail", MailRoutes)

routes.use("/api/v1/profile", SecuredUserApi, UserProfileRoutes)
routes.use("/api/v1/donation",  DonationRoutes)
routes.use("/api/v1/hoteldetail", HotelDetailRoutes)
routes.use("/api/v1/rating", RatingRoutes)
routes.use("/api/v1/hotelfilter", HotelFilterRoutes)




export default routes;