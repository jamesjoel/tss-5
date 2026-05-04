import express from 'express'
import { SaveUser, CheckUsername, GetAllUser } from "../controllers/UserController.js";

const routes = express.Router();

routes.post("/", SaveUser);

routes.get("/", GetAllUser)
routes.get("/checkusername/:u", CheckUsername)

// :3000/api/v1/user/checkusername/james

export default routes;

