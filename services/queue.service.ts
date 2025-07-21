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


export const voidQueue = async (id : string) => {
    const queue = await Queue.findByIdAndDelete(id)
    if(!queue || !queue.student) return 
    const newQueue : queueInterface = {
        number : await generateQueueNumber(),
        student : queue.student.toString(),
        date : queue.date
    }
    await Queue.create(newQueue)
}

export const removeQueue = async (id : string) => {
    await Queue.findByIdAndDelete(id)
}

export const clearQueue = async () => {
    await Queue.deleteMany({})
}

