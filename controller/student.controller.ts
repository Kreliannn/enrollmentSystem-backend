import { Response, Request } from "express";
import { getStudents, createStudent, getStudentById } from "../services/student.service";
import { studentInterface } from "../types/student.type";

export const createStudentController = async (request : Request , response : Response) => {
    
    interface dataType {
        name : string,
        level : string,
        sem : string,
        course : string,
        gender : string,
        passed : string[]
    }

    const body : dataType  = request.body

    const newAccount : studentInterface = {
        ...body,
        studentId : "2025-54276",
        subjects : [],
        section : "none",
        addedSubjects : [],
        failed : []
    }

    await createStudent(newAccount)
   
    response.send("success")
}

export const getStudentController = async (request : Request , response : Response) => {
    const students = await getStudents()
    response.send(students)
}

export const getProfByIdController = async (request : Request , response : Response) => {
    const { id } = request.params
    const student = await getStudentById(id)
    response.send(student)
}
