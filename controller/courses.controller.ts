import { Response, Request } from "express";
import { createCourse, getCourses } from "../services/course.service";

export const createCoursesController = async (request : Request , response : Response) => {
    console.log("test")
    const course   = request.body
    console.log(course)
    await createCourse(course)
    response.send("success")
}

export const getCoursesController = async (request : Request , response : Response) => {
    const courses = await getCourses()
    response.send(courses)
}




