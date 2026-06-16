import express from 'express'
import { GetHotelDetailById } from '../controllers/HotelDetailController.js'

let routes = express.Router();

routes.get("/:id", GetHotelDetailById)
export default routes;