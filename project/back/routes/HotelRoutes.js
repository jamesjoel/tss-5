import express from 'express'
import {SaveHotel, UpdateHotel, DeleteAll, DelteHotel, GetAllHotel, GetHotelById} from '../controllers/HotelController.js'
import IsAdminLoggedIn from '../auth/IsAdminLoggedIn.js';
const routes = express.Router();

routes.get("/", GetAllHotel)
routes.get("/deleteall", DeleteAll)
routes.get("/:id", GetHotelById)


routes.post("/", IsAdminLoggedIn, SaveHotel)
routes.put("/:id", IsAdminLoggedIn, UpdateHotel)
routes.delete("/:id", IsAdminLoggedIn,  DelteHotel)

export default routes;