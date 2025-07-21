import { Router } from "express";
import { getQueueController , voidQueueController, completeQueueController} from "../controller/queue.controller";


const route = Router()

route.get("/queue", getQueueController)
route.post("/queue/complete", completeQueueController)
route.post("/queue/void", voidQueueController)

export default route