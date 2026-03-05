import express from 'express'
import {SaveUser, GetUser} from '../controllers/UserController.js'

const routes = express.Router();
// http://localhost:3000/api/v1/user  (post)
routes.post("/", SaveUser);
routes.get("/", GetUser);

export default routes;