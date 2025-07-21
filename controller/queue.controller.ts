import { Response, Request } from "express";
import { getQueue, voidQueue, removeQueue , clearQueue} from "../services/queue.service";



export const getQueueController = async (request : Request , response : Response) => {
    const queue = await getQueue()
    response.send(queue)
}


export const voidQueueController = async (request : Request , response : Response) => {
    const { queueId } = request.body
    await voidQueue(queueId)
    const queue = await getQueue()
    response.send(queue)
}


export const completeQueueController = async (request : Request , response : Response) => {
    const { queueId } = request.body
    await removeQueue(queueId)
    const queue = await getQueue()
    response.send(queue)
}

export const clearQueueController = async (request : Request , response : Response) => {
    await clearQueue()
    const queue = await getQueue()
    response.send(queue)
}

