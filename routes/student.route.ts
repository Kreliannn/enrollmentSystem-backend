import { Router } from "express";
import { getStudentController, createStudentController, getStudentByIdController } from "../controller/student.controller";


const route = Router()

route.post("/student", createStudentController)
route.get("/student", getStudentController)
route.get("/student/:id", getStudentByIdController)

export default route