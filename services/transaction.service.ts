import Transaction from "../model/transaction.model"
import { transactionInterface } from "../types/transaction.type"


export const createTransaction= async (transaction : transactionInterface) => {
    return await Transaction.create(transaction)
}



export const getTransaction= async () => {
    return await Transaction.find().populate("student")
}
