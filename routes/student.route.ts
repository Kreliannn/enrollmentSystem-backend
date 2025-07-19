import { Router } from "express";
import { getStudentController, createStudentController, getStudentByIdController , enrollStudentController, authStudentController} from "../controller/student.controller";


const route = Router()

route.post("/student", createStudentController)
route.post("/student/enroll", enrollStudentController)
route.post("/student/auth", authStudentController)
route.get("/student", getStudentController)
route.post("/student/studentId", getStudentByIdController)

export default route