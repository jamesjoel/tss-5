import express from 'express'
import TeacherRoutes from './TeacherRoutes.js'
let routes = express.Router();

routes.use("/api/v1/teacher", TeacherRoutes);

export default routes;