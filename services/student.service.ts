import Student from "../model/student.model"
import Sections from "../model/section.model"
import { studentInterface } from "../types/student.type"
import mongoose from "mongoose"

export const createStudent = async ( student : studentInterface) => {
    return await Student.create(student)
}

export const getStudents = async () => {
    return await Student.find()
}

export const getStudentById = async (id: string) => {
  const student = await Student.findOne({ studentId: id }).lean();
  if (!student) return;

  const subjectIds = student.subjects.map(id => new mongoose.Types.ObjectId(id));

  const subjects = await Sections.aggregate([
    { $unwind: "$subjects" },
    { $match: { "subjects._id": { $in: subjectIds } } },
    {
      $lookup: {
        from: "profs", // collection name of Prof
        localField: "subjects.instructor",
        foreignField: "_id",
        as: "instructor"
      }
    },
    { $unwind: "$instructor" },
    {
      $addFields: {
        "subjects.instructor": "$instructor"
      }
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [ "$subjects", { sectionId: "$_id" } ]
        }
      }
    }
  ]);

  return {
    ...student,
    subjects
  };
};


export const generateStudentId = async () => {
    const students = await getStudents()
    if(students.length == 0) return "2025-1000"
    const lastNumber = Number(students[students.length - 1].studentId.split("-")[1])
    const studentId = lastNumber + 1
    return `2025-${studentId.toString()}`
}


export const addSubjectToStudent = async (id : string, sectionId : string) => {
    await Student.findByIdAndUpdate(id, {$push: { subjects : sectionId }})
}

export const updateStudentSection = async (id : string, section : string) => {
    await Student.findByIdAndUpdate(id, {section : section})
}


export const findStudent = async (studentId : string , password : string) => {
    const student = await Student.findOne({studentId, password})
    if(!student) return null
    return await getStudentById(student.studentId)
}

