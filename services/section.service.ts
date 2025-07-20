import Section from "../model/section.model"
import { sectionInterface, getSectionInterface } from "../types/section.type"
import mongoose from "mongoose"

export const createSection = async ( section : sectionInterface) => {
    return await Section.create(section)
}

export const getSection = async () => {
    return await Section.find().populate("subjects.instructor")
}

export const getSectionByCourse = async (course : string) => {
    return await Section.findOne({course}).populate("subjects.instructor")
}

export const getSectionById = async (id : string) => {
    const section = await Section.findById(id).populate("subjects.instructor") 
    return  section
}

export const addStudentToSection = async (id : string, sectionId : string) => {
    await Section.findByIdAndUpdate(sectionId, {$push: { students : id }})
}

export const getSpecificSubject = async (id : string) => {
    const subjectId = new mongoose.Types.ObjectId(id);

    const result = await Section.aggregate([
    { $unwind: "$subjects" },
    { $match: { "subjects._id": subjectId } },
    { $project: { subject: "$subjects", _id: 0 } }
    ]);

    return result[0]?.subject
}