import { Router } from "express";
import { getStudentController, createStudentController, getStudentByIdController , enrollStudentController} from "../controller/student.controller";


const route = Router()

route.post("/student", createStudentController)
route.post("/student/enroll", enrollStudentController)
route.get("/student", getStudentController)
route.post("/student/studentId", getStudentByIdController)

export default route