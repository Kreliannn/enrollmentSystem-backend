import { Router } from "express";
import { getQueueController } from "../controller/queue.controller";
import { getStudentQueueByIdController } from "../controller/student.controller";

const route = Router()

route.get("/queue", getQueueController)
route.post("/queue/test", getStudentQueueByIdController)

export default route