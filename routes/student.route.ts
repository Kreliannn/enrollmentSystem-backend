import { Router } from "express";
import { getStudentController, createStudentController } from "../controller/student.controller";


const route = Router()

route.post("/student", createStudentController)
route.get("/student", getStudentController)

export default route