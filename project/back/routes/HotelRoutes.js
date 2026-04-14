import express from 'express'
import {SaveHotel, UpdateHotel, DeleteAll, DelteHotel, GetAllHotel, GetHotelById} from '../controllers/HotelController.js'
const routes = express.Router();

routes.get("/", GetAllHotel)
routes.get("/deleteall", DeleteAll)
routes.get("/:id", GetHotelById)
routes.post("/", SaveHotel)
routes.put("/:id", UpdateHotel)
routes.delete("/:id", DelteHotel)

export default routes;