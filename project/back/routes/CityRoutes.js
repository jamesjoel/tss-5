import express from 'express'
import { GetAllCity } from '../controllers/CityController.js'

let routes = express.Router();

routes.get("/", GetAllCity)

export default routes;