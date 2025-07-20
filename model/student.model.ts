import mongoose, { Schema, Document } from 'mongoose';


const StudentSchema = new Schema({
    name : { type: String, required: true },
    studentId : { type: String, required: true },
    password : { type: String, required: true },
    course : { type: String, required: true },
    status : { type: String, required: true },
    level : { type: String, required: true },
    gender : { type: String, required: true },
    sem : { type: String, required: true },
    section : { type: String, required: true },
    subjects : [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
    passed : [String],
    failed : [String],
});

export default mongoose.model('Student', StudentSchema)