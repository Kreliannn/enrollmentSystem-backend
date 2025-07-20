import { Router } from "express";
import { getStudentController, enrollIrregStudentController ,createStudentController, getStudentByIdController , enrollStudentController, authStudentController, clearStudentByIdController} from "../controller/student.controller";


const route = Router()

route.post("/student", createStudentController)
route.post("/student/enroll", enrollStudentController)
route.post("/student/irregEnroll", enrollIrregStudentController)
route.patch("/student/clear", clearStudentByIdController)
route.post("/student/auth", authStudentController)
route.get("/student", getStudentController)
route.post("/student/studentId", getStudentByIdController)

export default route