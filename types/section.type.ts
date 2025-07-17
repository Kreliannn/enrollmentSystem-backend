import { getProfInterface } from "./prof.type"

export interface enrolledInterface {
    studentId : string,
    studentName : string
}


export interface sectionSubjects  {
    name : string,
    code : string,
    units : number,
    type : string,
    days : string,
    start : string,
    end : string,
    section : string,
    room : string
    instructor : getProfInterface,
    students : enrolledInterface[]
}

export interface sectionInterface{
    course : string,
    level : string,
    sem : string,
    section : string,
    subjects : sectionSubjects[],
    students : enrolledInterface[]
}


export interface getSectionInterface extends sectionInterface {
    _id : string
}




