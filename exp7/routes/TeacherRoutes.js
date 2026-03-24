import express from 'express';
import { SaveTeacher, GetAllTeacher } from '../controllers/TeacherController.js';

const routes = express.Router();


routes.get("/", SaveTeacher);
routes.get("/all", GetAllTeacher);

export default routes;