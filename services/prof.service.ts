import Prof from "../model/prof.model"
import Sections from "../model/section.model"
import { profInterface } from "../types/prof.type"

export const createProf = async ( prof : profInterface) => {
    return await Prof.create(prof)
}

export const getProf= async () => {
    return await Prof.find()
}

export const getProfById = async (id : string) => {


    const prof = await Prof.findById(id).lean();

    if(!prof) return

    const scheduleIds = prof.schedules; 

    const subjects = await Sections.aggregate([
        { $unwind: "$subjects" },
        { $match: { "subjects._id": { $in: scheduleIds } } },
        {
            $project: {
            sectionId: "$_id",
            subject: "$subjects",
            }
        }
    ]);

    return {
        ...prof,
        schedules : subjects
    }
}

export const addSubjectToSched = async (id : string, sectionId : string) => {
    await Prof.findByIdAndUpdate(id, {$push: { schedules: sectionId }})
}