import express from 'express'
import { AllHotelFilter } from '../controllers/HotelFilterController.js';

const routes = express.Router();


routes.get("/", AllHotelFilter)


export default routes;