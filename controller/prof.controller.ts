import { Response, Request } from "express";
import { getProf, createProf , getProfById, findProf} from "../services/prof.service";

export const createProfController = async (request : Request , response : Response) => {
    const prof   = request.body
    await createProf(prof)
    const profs = await getProf()
    response.send(profs)
}

export const authProfController = async (request : Request , response : Response) => {
    const {email, password}   = request.body
    const prof = await findProf(email, password)
    response.send(prof)
}

export const getProfController = async (request : Request , response : Response) => {
    const prof = await getProf()
    response.send(prof)
}

export const getProfByIdController = async (request : Request , response : Response) => {
    const { id } = request.params
    const prof = await getProfById(id)
    response.send(prof)
}
