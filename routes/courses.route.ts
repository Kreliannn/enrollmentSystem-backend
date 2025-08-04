import { Router } from "express";
import { getCoursesController, createCoursesController, getAdminDataController } from "../controller/courses.controller";


const route = Router()

route.post("/course", createCoursesController)
route.get("/course", getCoursesController)
route.get("/admin", getAdminDataController)

export default route