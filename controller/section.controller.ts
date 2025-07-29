import { Response, Request } from "express";
import { createSection, getSection , getSectionByCourse, checkIfSectionExist, removeSectionByID} from "../services/section.service";
import { sectionInterface, sectionSubjects } from "../types/section.type";
import { addSubjectToSched } from "../services/prof.service";
import { removeSujectToSched } from "../services/prof.service";


export const createSectionController = async (request : Request , response : Response) => {
    const section : sectionInterface = request.body

    if(await checkIfSectionExist(section.course, section.level, section.sem, section.section)){
        response.status(400).send("Section already exists")
        return
    }

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


export const getAllSubByCourse = async (request : Request , response : Response) => {
    const {course} = request.params
    const  sections = await getSectionByCourse(course)
    response.send(sections)
}


export const deleteSectionController = async (request : Request , response : Response) => {
   const { sectionId } = request.params
   const deletedSection = await removeSectionByID(sectionId)
   if(!deletedSection){
       response.status(404).send("Section not found")
       return
   }
    deletedSection.subjects.forEach(async (item) => {
        await removeSujectToSched(item.instructor?.toString(), item._id.toString())
    })
    const section = await getSection()
    response.send(section)
}
