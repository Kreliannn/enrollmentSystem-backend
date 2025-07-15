import { Router } from "express";
import { getCoursesController, createCoursesController } from "../controller/courses.controller";


const route = Router()

route.post("/course", createCoursesController)
route.get("/course", getCoursesController)

export default route