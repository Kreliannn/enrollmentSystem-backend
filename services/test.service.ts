import Courses from "../model/courses.model"
import { courseInterface } from "../types/courses.type"

export const createCourse = async ( course : courseInterface) => {
    return await Courses.create(course)
}

export const getCourses = async () => {
    return await Courses.find()
}