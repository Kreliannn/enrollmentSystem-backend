import Section from "../model/section.model"
import { sectionInterface, getSectionInterface } from "../types/section.type"

export const createSection = async ( section : sectionInterface) => {
    return await Section.create(section)
}

export const getSection = async () => {
    return await Section.find().populate("subjects.instructor")
}

export const getSectionById = async (id : string) => {
    const section = await Section.findById(id).populate("subjects.instructor") 
    return  section
}

export const addStudentToSection = async (id : string, sectionId : string) => {
    await Section.findByIdAndUpdate(sectionId, {$push: { students : id }})
}