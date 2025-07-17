import Section from "../model/section.model"
import { sectionInterface } from "../types/section.type"

export const createSection = async ( section : sectionInterface) => {
    return await Section.create(section)
}

export const getSection = async () => {
    return await Section.find().populate("subjects.instructor")
}