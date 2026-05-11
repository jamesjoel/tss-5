import express from 'express'
import {SaveCus, UpdateCus, DelteCus, GetAllCus, GetCusById} from '../controllers/CuisineController.js'
import IsAdminLoggedIn from '../auth/IsAdminLoggedIn.js';
const routes = express.Router();

routes.get("/", GetAllCus)
routes.get("/:id", GetCusById)


routes.post("/", IsAdminLoggedIn, SaveCus)
routes.put("/:id", IsAdminLoggedIn,  UpdateCus)
routes.delete("/:id", IsAdminLoggedIn, DelteCus)

export default routes;