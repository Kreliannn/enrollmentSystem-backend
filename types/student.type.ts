import { sectionSubjects } from "./section.type"


export interface studentInterface {
    name : string,
    studentId : string,
    course : string,
    level : string,
    gender : string,
    sem : string,
    section : string,
    subjects : sectionSubjects[],
    addedSubjects : sectionSubjects[],
    passed : string[],
    failed : string[]
}

export interface getStudentInterface extends studentInterface {
    _id : string
}




