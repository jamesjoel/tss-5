import express from 'express'
import { GetAllCity } from "../controllers/CityController.js";

const routes = express.Router();

routes.get("/", GetAllCity);

export default routes;

