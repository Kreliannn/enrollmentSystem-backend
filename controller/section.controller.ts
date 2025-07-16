import { Response, Request } from "express";
import { createSection, getSection } from "../services/section.service";

export const createSectionController = async (request : Request , response : Response) => {
    const section = request.body
    await createSection(section)
    response.send("success")
}

export const getSectionController = async (request : Request , response : Response) => {
    const section = await getSection()
    response.send(section)
}




