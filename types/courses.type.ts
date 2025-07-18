export interface subjectsInterface {
    name : string,
    code : string,
    units : number,
    prerequisite : string,
    course : string,
}

export interface yearLevelInterface {
    level : string,
    sem : string,
    tuition : number,
    subjects :  subjectsInterface[]
}


export interface courseInterface {
    course : string,
    code : string,
    year : yearLevelInterface[]
}


export interface getCoursesInterface extends courseInterface {
    _id : string
}