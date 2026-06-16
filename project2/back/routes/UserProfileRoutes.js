import express from 'express'
import { EditProfile, Profile, ChangePassword } from '../controllers/UserProfileController.js'

let routes = express.Router();

routes.get("/", Profile)
routes.post("/", EditProfile)
routes.post("/changepassword", ChangePassword)


export default routes;