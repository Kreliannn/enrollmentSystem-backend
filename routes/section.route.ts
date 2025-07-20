import { Router } from "express";
import { getSectionController, createSectionController, getAllSubByCourse } from "../controller/section.controller";


const route = Router()

route.post("/section", createSectionController)
route.get("/section", getSectionController)
route.get("/section/:course", getAllSubByCourse)

export default route