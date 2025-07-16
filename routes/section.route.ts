import { Router } from "express";
import { getSectionController, createSectionController } from "../controller/section.controller";


const route = Router()

route.post("/section", createSectionController)
route.get("/section", getSectionController)

export default route