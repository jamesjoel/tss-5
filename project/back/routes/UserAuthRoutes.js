import express from 'express'
import { UserAuth } from "../controllers/UserAuthController.js";

const routes = express.Router();

routes.post("/", UserAuth);


export default routes;
