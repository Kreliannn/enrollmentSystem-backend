import { Response, Request } from "express";
import { createSection, getSection } from "../services/section.service";
import { sectionInterface } from "../types/section.type";
import { addSubjectToSched } from "../services/prof.service";

export const createSectionController = async (request : Request , response : Response) => {
    const section : sectionInterface = request.body

    const sectionCreated = await createSection(section)

    sectionCreated.subjects.forEach(async (item) => {
        await addSubjectToSched(item.instructor?.toString(), item._id.toString())
    })
    
    response.send(sectionCreated)
}

export const getSectionController = async (request : Request , response : Response) => {
    const section = await getSection()
    response.send(section)
}




