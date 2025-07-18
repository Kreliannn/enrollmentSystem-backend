import { getProfInterface } from "./prof.type"
import { getStudentInterface } from "./student.type"


export interface sectionSubjects  {
    course : string,
    name : string,
    code : string,
    units : number,
    days : string,
    start : string,
    end : string,
    section : string,
    room : string
    instructor : getProfInterface,
    students : getStudentInterface[]
}

export interface sectionInterface{
    course : string,
    level : string,
    sem : string,
    section : string,
    subjects : sectionSubjects[],
    students : getStudentInterface[]
}


export interface getSectionInterface extends sectionInterface {
    _id : string
}




