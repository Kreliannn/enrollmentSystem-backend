import { Response, Request } from "express";
import { createCourse, getCourses, checkIfCourseExisted } from "../services/course.service";
import { getSection } from "../services/section.service";
import { getProf } from "../services/prof.service";
import { getStudents } from "../services/student.service";

export const createCoursesController = async (request : Request , response : Response) => {
    const course   = request.body
    await createCourse(course)
    response.send("success")
}

export const getCoursesController = async (request : Request , response : Response) => {
    const courses = await getCourses()
    response.send(courses)
}



export const getAdminDataController = async (request : Request , response : Response) => {
    const courses = await getCourses()
    const sections = await getSection()
    const students = await getStudents()
    const prof = await getProf()
    response.send({
      courses: courses.length,
      sections: sections.length,
      students: students.length,
      instructors: prof.length,
    })
}
