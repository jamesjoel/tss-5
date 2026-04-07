import express from 'express'
import { GetAllUser, SaveUser, UsernameExists,EmailExists} from '../controllers/UserController.js'

let routes = express.Router();

routes.post("/", SaveUser)
routes.get("/", GetAllUser)
routes.get("/username-exists/:u", UsernameExists)
routes.get("/email-exists/:e", EmailExists)

// http://localhost:3000/api/v1/user/username-exists/james

export default routes;