import express from 'express'
import { DeleteAllHotel, GetAllHotel, SaveHotel, UploadCoverImage } from '../controllers/HotelController.js'

const routes = express.Router();

routes.post("/", SaveHotel)
routes.get("/", GetAllHotel)
routes.get("/deleteall", DeleteAllHotel)
routes.put("/coverimage/:id", UploadCoverImage)

export default routes;