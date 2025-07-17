import { Router } from "express";
import { getProfController, createProfController , getProfByIdController} from "../controller/prof.controller";


const route = Router()

route.post("/prof", createProfController)
route.get("/prof", getProfController)
route.get("/prof/:id", getProfByIdController)

export default route