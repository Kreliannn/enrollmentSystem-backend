import { Router } from "express";
import { getQueueController , voidQueueController, completeQueueController, clearQueueController} from "../controller/queue.controller";


const route = Router()

route.get("/queue", getQueueController)
route.post("/queue/complete", completeQueueController)
route.post("/queue/void", voidQueueController)
route.post("/queue/clear", clearQueueController)

export default route