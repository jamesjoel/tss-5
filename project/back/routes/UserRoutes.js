import express from 'express'
import { SaveUser } from '../controllers/UserController.js'

let routes = express.Router();

routes.post("/", SaveUser)

export default routes;