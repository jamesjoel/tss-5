import express from 'express'
import StudentRoutes from './student.js'
import TeacherRoutes from './Teacher.js'
let routes = express.Router();

routes.use("/api/v1/teacher", TeacherRoutes);
routes.use("/api/v1/student", StudentRoutes);


export default routes;