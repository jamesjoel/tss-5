import express from 'express';
import { SaveRating, GetAllRating } from '../controllers/RatingController.js';
import SecuredUserApi from '../util/SecuredUserApi.js'
const routes = express.Router();

routes.post("/",  SecuredUserApi,SaveRating);
routes.get("/:id",  GetAllRating);
export default routes;