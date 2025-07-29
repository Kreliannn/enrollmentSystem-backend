import Courses from "../model/courses.model"
import { courseInterface } from "../types/courses.type"
import { haveSameItems } from "../utils/function"

export const createCourse = async ( course : courseInterface) => {
    return await Courses.create(course)
}

export const getCourses = async () => {
    return await Courses.find()
}


export const checkIfCourseExisted = async (code : string) => {
    const course = await Courses.findOne({ code })
    if(!course) return false
    return true
}


export const checkIfStudentGraduate = async (course : string, passed : string[]) => {
    const courses = await Courses.findOne({ code : course})
    if(!courses) return 
    const allSubCode : string[] = []
    courses.year.forEach((year) => {
        year.subjects.forEach((sub) => {
            allSubCode.push(sub.code)
        })
    })
    return haveSameItems(allSubCode, passed)
}