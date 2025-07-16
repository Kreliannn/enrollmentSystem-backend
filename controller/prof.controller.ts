import { Response, Request } from "express";
import { getProf, createProf } from "../services/prof.service";

export const createProfController = async (request : Request , response : Response) => {
    const prof   = request.body
    await createProf(prof)
    response.send("success")
}

export const getProfController = async (request : Request , response : Response) => {
    const prof = await getProf()
    response.send(prof)
}


