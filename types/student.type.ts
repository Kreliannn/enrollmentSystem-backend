import { sectionSubjects } from "./section.type"


export interface studentInterface {
    name : string,
    studentId : string,
    course : string,
    level : string,
    gender : string,
    sem : string,
    section : string,
    subject : sectionSubjects[],
    addedSubject : sectionSubjects[],
    passed : string[],
    failed : string[]
}






