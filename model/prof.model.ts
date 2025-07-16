import mongoose, { Schema, Document } from 'mongoose';


const profSchema = new Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    contact : { type: String, required: true },
    subjects : [{
        name : { type: String, required: true },
        code : { type: String, required: true },
        units : { type: Number, required: true },
        type : { type: String, required: true },
        days : { type: String, required: true },
        start : { type: String, required: true },
        end : { type: String, required: true },
        section : { type: String, required: true },
        room : { type: String, required: true },
        instructor : { type: String, required: true },
        students : [{
            studentId : { type: String, required: true },
            studentName : { type: String, required: true },
        }]
    }],
});

export default mongoose.model('Prof', profSchema)

