import { Router } from "express";
import { getTransaction } from "../services/transaction.service";


const route = Router()

route.get("/transaction", async (request, response) => {
    const transaction = await getTransaction()
    transaction.reverse()
    response.send(transaction)
})


export default route