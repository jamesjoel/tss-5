import express from 'express'
import { SaveStudent, GetAllStudent } from '../controllers/StudentController.js'
const routes = express.Router();

routes.get("/", SaveStudent);
routes.get("/all", GetAllStudent);


export default routes;