import { Router } from "express";
import { getProfController, createProfController , getProfByIdController, authProfController} from "../controller/prof.controller";


const route = Router()

route.post("/prof", createProfController)
route.post("/prof/auth", authProfController)
route.get("/prof", getProfController)
route.get("/prof/:id", getProfByIdController)

export default route