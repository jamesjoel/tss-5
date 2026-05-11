import express from 'express'
import { AdminAuth } from "../controllers/AdminAuthController.js";

const routes = express.Router();

routes.post("/", AdminAuth);


export default routes;
