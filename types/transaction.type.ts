import { getStudentInterface } from "./student.type"

export interface transactionInterface {
    student : string,
    mode : string,
    amount : number,
    date : string
}

export interface getTransactionInterface {
    _id : string,
    student : getStudentInterface,
    mode : string,
    amount : number,
    date : string
}