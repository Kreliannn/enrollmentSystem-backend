import Prof from "../model/prof.model"
import Sections from "../model/section.model"
import { profInterface } from "../types/prof.type"
import mongoose from "mongoose"

export const createProf = async ( prof : profInterface) => {
    return await Prof.create(prof)
}

export const getProf= async () => {
    return await Prof.find()
}


export const findProf= async (email : string , password : string) => {
    const prof = await Prof.findOne({email, password})
    if(!prof) return null
    return await getProfById(prof._id.toString())
}

export const checkEmailIfExisted = async (email : string ) => {
    const prof = await Prof.findOne({email})
    if(!prof) return false
    return true
}


export const getProfById = async (id: string) => {
  const prof = await Prof.findById(id).lean();
  if (!prof) return;

  const scheduleIds = prof.schedules;

  const subjectsResult = await Sections.aggregate([
    { $unwind: "$subjects" },
    { $match: { "subjects._id": { $in: scheduleIds } } },

    // Lookup students for each subject
    {
      $lookup: {
        from: "students", // collection name in lowercase & plural
        localField: "subjects.students",
        foreignField: "_id",
        as: "subjects.studentsData"
      }
    },

    // Replace subject.students ObjectIds with full student objects
    {
      $addFields: {
        "subjects.students": "$subjects.studentsData"
      }
    },

    { $project: { subjects: 1 } },
    { $replaceRoot: { newRoot: "$subjects" } }
  ]);

  return {
    ...prof,
    schedules: subjectsResult
  };
};


export const addSubjectToSched = async (id : string, sectionId : string) => {
    await Prof.findByIdAndUpdate(id, {$push: { schedules: sectionId }})
}


export const removeSujectToSched = async (id : string, sectionId : string) => {
    await Prof.findByIdAndUpdate(id, {$pull: { schedules: sectionId }})
}
