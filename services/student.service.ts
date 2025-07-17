import Student from "../model/student.model"
import { studentInterface } from "../types/student.type"

export const createStudent = async ( student : studentInterface) => {
    return await Student.create(student)
}

export const getStudents = async () => {
    return await Student.find()
}

export const getStudentById = async ( id : string ) => {
    return await Student.findById(id)
}