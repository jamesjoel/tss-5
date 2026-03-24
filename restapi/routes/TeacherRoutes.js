import express from 'express'
import {
    SaveTeacher, 
    UpdateTeacher,
    DeleteTeacher,
    GetAllTeacher,
    GetTeacherById
} from '../controllers/TeacherController.js'

let routes = express.Router();

routes.get("/", GetAllTeacher)
routes.get("/:id", GetTeacherById)
routes.post("/", SaveTeacher)
routes.put("/:id", UpdateTeacher)
routes.delete("/:id", DeleteTeacher)

export default routes;