import e from "express"
import Section from "../model/section.model"
import Student from "../model/student.model"
import { sectionInterface, getSectionInterface } from "../types/section.type"
import mongoose from "mongoose"
import { addPassedSub } from "./student.service"


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


export const addStudentToSubject = async (id : string) => {

    const student = await Student.findById(id)

    if(!student) return

    student.subjects.forEach( async (sub) => {
         const subjectId = new mongoose.Types.ObjectId(sub);
         await Section.updateOne(
            { "subjects._id": subjectId }, // find the subject by its ID
            {
                $addToSet: { "subjects.$[elem].students": student._id } 
            },
            {
                arrayFilters: [{ "elem._id": subjectId }]
            }
        )
    })

    
}


export const removeStudentToSubject = async (subject_id : string, student_id : string) => {
    await Section.updateOne(
        { "subjects._id": subject_id },
        {
            $pull: {
            "subjects.$[subject].students": student_id
            }
        },
        {
            arrayFilters: [{ "subject._id": subject_id }]
        }
    );
}

export const passAllEnrolled = async () => {
  const allSection = await Section.find();
  
  for (const section of allSection) {
    for (const sub of section.subjects) {
      const subCode = sub.code;
      for (const student_id of sub.students) {
        const student = await Student.findById(student_id.toString())
        if(!student) return
        if(student.status == "enrolled" && student.balance == 0){
             await addPassedSub(student_id.toString(), subCode);
        }
      }
    }
  }
};


export const clearSectionStudent= async ( ) => {
    await Section.updateMany({}, { $set: { students: [] } });

    const sections = await Section.find();

    for (const section of sections) {
    section.subjects.forEach((subj) => {
        subj.students = []; 
    });
    await section.save();
    }
}



