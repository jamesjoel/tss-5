import express from 'express'
import { SaveUser, CheckUsername, GetAllUser, UpdatePassword, CheckOtp, DeleteAll, ForgotPassword } from "../controllers/UserController.js";

const routes = express.Router();

routes.post("/", SaveUser);

routes.get("/", GetAllUser)
routes.get("/checkusername/:u", CheckUsername)

routes.get("/deleteall", DeleteAll)

routes.post("/forgotpassword", ForgotPassword)
routes.post("/checkotp", CheckOtp)
routes.post("/updatepassword", UpdatePassword)

// :3000/api/v1/user/checkusername/james

export default routes;

