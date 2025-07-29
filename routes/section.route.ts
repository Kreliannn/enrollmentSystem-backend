import { Router } from "express";
import { getSectionController, createSectionController, getAllSubByCourse, deleteSectionController } from "../controller/section.controller";


const route = Router()

route.post("/section", createSectionController)
route.get("/section", getSectionController)
route.get("/section/:course", getAllSubByCourse)
route.delete("/section/:sectionId", deleteSectionController)


export default route