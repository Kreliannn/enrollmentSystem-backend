import { Router } from "express";
import {studentPayBalanceQueueController ,getStudentController, studentCreateQueueController ,studentForPaymentController ,enrollIrregStudentController ,createStudentController, getStudentByIdController , enrollStudentController, authStudentController, clearStudentByIdController} from "../controller/student.controller";


const route = Router()

route.post("/student", createStudentController)
route.post("/student/enroll", enrollStudentController)
route.post("/student/irregEnroll", enrollIrregStudentController)
route.post("/student/forPayment", studentForPaymentController)
route.patch("/student/clear", clearStudentByIdController)
route.post("/student/auth", authStudentController)
route.post("/student/requestQueue", studentCreateQueueController)
route.get("/student", getStudentController)
route.post("/student/studentId", getStudentByIdController)
route.post("/student/pay", studentPayBalanceQueueController)


export default route