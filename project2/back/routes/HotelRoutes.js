import express from 'express'
import { SaveHotel } from '../controllers/HotelController.js'

const routes = express.Router();

routes.post("/", SaveHotel)

export default routes;