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

export const getProfById = async (id: string) => {
  const prof = await Prof.findById(id).lean();
  if (!prof) return;

  // Convert schedule ObjectIds from string to actual ObjectIds
  const scheduleIds = prof.schedules

  // Aggregate and extract only the subject objects
  const subjectsResult = await Sections.aggregate([
    { $unwind: "$subjects" },
    { $match: { "subjects._id": { $in: scheduleIds } } },
    { $replaceRoot: { newRoot: "$subjects" } }
  ]);

  return {
    ...prof,
    schedules: subjectsResult // now contains only the subject objects
  };
};

export const addSubjectToSched = async (id : string, sectionId : string) => {
    await Prof.findByIdAndUpdate(id, {$push: { schedules: sectionId }})
}