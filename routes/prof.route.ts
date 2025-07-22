import { Router } from "express";
import { getProfController, createProfController , getProfByIdController, authProfController, failedStudentController} from "../controller/prof.controller";


const route = Router()

route.post("/prof", createProfController)
route.post("/prof/auth", authProfController)
route.get("/prof", getProfController)
route.get("/prof/:id", getProfByIdController)
route.post("/prof/failedStudent", failedStudentController)

export default route