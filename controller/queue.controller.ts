import { Response, Request } from "express";
import { getQueue } from "../services/queue.service";



export const getQueueController = async (request : Request , response : Response) => {
    const queue = await getQueue()
    response.send(queue)
}

