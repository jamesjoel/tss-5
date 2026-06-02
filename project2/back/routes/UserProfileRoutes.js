import express from 'express'
import { EditProfile, Profile } from '../controllers/UserProfileController.js'

let routes = express.Router();

routes.get("/", Profile)
routes.post("/", EditProfile)

export default routes;