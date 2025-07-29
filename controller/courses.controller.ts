import { Response, Request } from "express";
import { createCourse, getCourses, checkIfCourseExisted } from "../services/course.service";

export const createCoursesController = async (request : Request , response : Response) => {
    const course   = request.body
    await createCourse(course)
    response.send("success")
}

export const getCoursesController = async (request : Request , response : Response) => {
    const courses = await getCourses()
    response.send(courses)
}




