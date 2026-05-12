import express from 'express'
import { GetAllHotel, SaveHotel } from '../controllers/HotelController.js'

const routes = express.Router();

routes.post("/", SaveHotel)
routes.get("/", GetAllHotel)

export default routes;