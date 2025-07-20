import Queue from "../model/queue.mode"
import { queueInterface } from "../types/queue.type"


export const CreateQueue = async (queue : queueInterface) => {
    return await Queue.create(queue)
}



export const getQueue = async () => {
    return await Queue.find().populate("student")
}





export const generateQueueNumber = async () => {
    const queue = await Queue.find()
    if(queue.length == 0) return 1
    const lastNumber = queue[queue.length - 1].number
    return lastNumber + 1
}




