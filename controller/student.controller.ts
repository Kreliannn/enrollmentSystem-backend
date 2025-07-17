import { Response, Request } from "express";
import { getStudents, createStudent, getStudentById } from "../services/student.service";

export const createStudentController = async (request : Request , response : Response) => {
    const student  = request.body
    await createStudent(student)
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
