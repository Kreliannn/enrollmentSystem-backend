import Prof from "../model/prof.model"
import { profInterface } from "../types/prof.type"

export const createProf = async ( prof : profInterface) => {
    return await Prof.create(prof)
}

export const getProf= async () => {
    return await Prof.find()
}