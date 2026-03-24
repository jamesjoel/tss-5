import express from 'express';
import {Index, Info} from '../controllers/StudentController.js'

const routes = express.Router();

routes.get("/", Index)
routes.get("/info", Info)
export default routes;