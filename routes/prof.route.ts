import { Router } from "express";
import { getProfController, createProfController } from "../controller/prof.controller";


const route = Router()

route.post("/prof", createProfController)
route.get("/prof", getProfController)

export default route