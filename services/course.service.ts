import Courses from "../model/courses.model"
import { courseInterface } from "../types/courses.type"

export const createCourse = async ( course : courseInterface) => {
    return await Courses.create(course)
}

export const getCourses = async () => {
    return await Courses.find()
}

export const getTuition = async (courseCode : string, level : string, sem : string) => {
    const course = await Courses.findOne({code : courseCode})
    if(!course) return -100
    const year = course.year.filter((item) => item.level == level && item.sem == sem)[0]
    return year.tuition
}