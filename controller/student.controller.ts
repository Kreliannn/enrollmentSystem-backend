import { Response, Request } from "express";
import { updateStudentRequirements,updateStudentLevel,  clearStudentSub,setStudentBalance ,getStudentTuition, updateStudentBalance ,getStudents ,createStudent, getStudentById, generateStudentId , addSubjectToStudent, updateStudentSection, findStudent, clearStudent, updateStudentStatus} from "../services/student.service";
import { studentInterface } from "../types/student.type";
import { getSectionById, addStudentToSection, getSpecificSubject , addStudentToSubject, passAllEnrolled, clearSectionStudent} from "../services/section.service";
import { getSectionInterface } from "../types/section.type";
import { generateQueueNumber, CreateQueue, getQueue } from "../services/queue.service";
import { queueInterface } from "../types/queue.type";
import { createTransaction } from "../services/transaction.service";
import { haveSameItems } from "../utils/function";

const requirementList = [
   "Form 138",
   "Good Moral",
   "2x2 Picture",
   "PSA",
   "SHS Diploma",
];


export const createStudentController = async (request : Request , response : Response) => {

    interface dataType {
        name : string,
        level : string,
        sem : string,
        password : string,
        course : string,
        gender : string,
        passed : string[],
        requirements : string[]
    }


    const body : dataType  = request.body

    const newAccount : studentInterface = {
        ...body,
        balance : 0,
        status : (haveSameItems(requirementList, body.requirements)) ? "unEnrolled" : "unComplete",
        studentId : await generateStudentId(),
        subjects : [],  
        section : "none",
        failed : []
    }

    const student = await createStudent(newAccount)
   
    response.send(student)
}

export const getStudentController = async (request : Request , response : Response) => {
    const students = await getStudents()
    response.send(students)
}

export const getStudentByIdController = async (request : Request , response : Response) => {
    const { id } = request.body
    const student = await getStudentById(id)
    response.send(student)
}

export const enrollStudentController = async (request : Request , response : Response) => {
    const { studentId , sectionId } = request.body
    
    const student = await getStudentById(studentId)
    const section  = await getSectionById(sectionId)

    if(!student || !section){
        response.status(500).send("error")
        return
    }

    section.subjects.forEach(async (sub) => {
        if(!student.passed.includes(sub.code))
        {
            if(sub.prerequisite == "none") return await addSubjectToStudent(student._id.toString(), sub._id.toString())        
            if(student.passed.includes(sub.prerequisite)) return await addSubjectToStudent(student._id.toString(), sub._id.toString())
        }
    })
    
    await addStudentToSection(student._id.toString(), sectionId)

    await updateStudentStatus(student._id.toString(), "For Printing")

    await updateStudentSection(student._id.toString(), section.section)

    const updatedStudent = await getStudentById(studentId)

    response.send(updatedStudent)
}


export const enrollIrregStudentController = async (request : Request , response : Response) => {
    const { studentId , subjects } = request.body
    
    const student = await getStudentById(studentId)
    

    if(!student){
        response.status(500).send("error")
        return
    }

    subjects.forEach(async (sub : any) => {
        await addSubjectToStudent(student._id.toString(), sub._id.toString()) 
    })

    
    await updateStudentStatus(student._id.toString(), "For Printing")

    const updatedStudent = await getStudentById(studentId)

    response.send(updatedStudent)
}



export const authStudentController = async (request : Request , response : Response) => {
    const {studentId, password}   = request.body
    const student = await findStudent(studentId, password)
    response.send(student)
}


export const clearStudentByIdController = async (request : Request , response : Response) => {
    const { id } = request.body
    await clearStudent(id)
    const student = await getStudentById(id) 
    response.send(student)
}


export const studentForPaymentController = async (request : Request , response : Response) => {
   
    const { id } = request.body

    const queueNumber = await generateQueueNumber() 
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    const newQueue = {
        student : id,
        number : queueNumber as number,
        date : today
    }

    const queue = await CreateQueue(newQueue)

    await setStudentBalance(id, await getStudentTuition(id))

    await addStudentToSubject(id)

    await updateStudentStatus(id, "enrolled")
    
    response.send(queue)
}


export const studentCreateQueueController = async (request : Request , response : Response) => {
    const { id } = request.body
    const queueNumber = await generateQueueNumber() 
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    const newQueue = {
        student : id,
        number : queueNumber as number,
        date : today
    }
    await CreateQueue(newQueue)
    const queue = await getQueue()
    response.send(queue)
}


export const studentPayBalanceQueueController = async (request : Request , response : Response) => {
    const { id, payment } = request.body
    const student = await updateStudentBalance(id, payment)
    const date = new Date();
    const today = date.toISOString().split('T')[0];
    const newTransaction = {
        student : id,
        amount : payment,
        date : today
    }
    await createTransaction(newTransaction)
    response.send(student)
}

export const studentUpdateRequirementsController = async (request : Request , response : Response) => {

    const { id, requirements } = request.body

    if(haveSameItems(requirementList, requirements)){
        await updateStudentStatus(id, "unEnrolled")
    } else {
        await updateStudentStatus(id, "unComplete")
    }

    const student = await updateStudentRequirements(id, requirements)

    console.log(student)
   
    response.send(student)
}

export const proceedToNextSemController = async (request : Request , response : Response) => {
    await passAllEnrolled() //check balance
    await clearStudentSub()
    await clearSectionStudent()
    await updateStudentLevel() //check balance
    response.send("success")
}