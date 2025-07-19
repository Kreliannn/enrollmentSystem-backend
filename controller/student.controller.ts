import { Response, Request } from "express";
import { getStudents, createStudent, getStudentById, generateStudentId , addSubjectToStudent, updateStudentSection, findStudent} from "../services/student.service";
import { studentInterface } from "../types/student.type";
import { getSectionById, addStudentToSection } from "../services/section.service";
import { getSectionInterface } from "../types/section.type";


export const createStudentController = async (request : Request , response : Response) => {

    interface dataType {
        name : string,
        level : string,
        sem : string,
        password : string,
        course : string,
        gender : string,
        passed : string[]
    }

    const body : dataType  = request.body

    const newAccount : studentInterface = {
        ...body,
        studentId : await generateStudentId(),
        subjects : [],
        section : "none",
        failed : []
    }

    await createStudent(newAccount)
   
    response.send("success")
}

export const getStudentController = async (request : Request , response : Response) => {
    const students = await getStudents()
    response.send(students)
}

export const getStudentByIdController = async (request : Request , response : Response) => {
    const { id } = request.body
    const student = await getStudentById(id)
    response.send(student)
}

export const enrollStudentController = async (request : Request , response : Response) => {
    const { studentId , sectionId } = request.body
    
    const student = await getStudentById(studentId)
    const section  = await getSectionById(sectionId)

    if(!student || !section){
        response.status(500).send("error")
        return
    }

    section.subjects.forEach(async (sub) => {
       await addSubjectToStudent(student._id.toString(), sub._id.toString())
    })
    
    await addStudentToSection(student._id.toString(), sectionId)
    await updateStudentSection(student._id.toString(), section.section)

    await updateStudentSection(student._id.toString(), section.section)

    const updatedStudent = await getStudentById(studentId)


    response.send(updatedStudent)
}





export const authStudentController = async (request : Request , response : Response) => {
    const {studentId, password}   = request.body
    const student = await findStudent(studentId, password)
    response.send(student)
}
