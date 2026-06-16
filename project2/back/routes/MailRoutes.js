import express from 'express'
import { SendMail } from '../controllers/MailController.js'

let routes = express.Router();

routes.get("/", SendMail);

export default routes;