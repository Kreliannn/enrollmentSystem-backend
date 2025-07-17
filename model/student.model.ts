import mongoose, { Schema, Document } from 'mongoose';


const StudentSchema = new Schema({
    name : { type: String, required: true },
    course : { type: String, required: true },
    level : { type: String, required: true },
    sem : { type: String, required: true },
    section : { type: String, required: true },
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
        instructor: { type: Schema.Types.ObjectId, ref: 'Prof', required: true },
    }],
    addedSubjects : [{ 
        name : { type: String, required: true },
        code : { type: String, required: true },
        units : { type: Number, required: true },
        type : { type: String, required: true },
        days : { type: String, required: true },
        start : { type: String, required: true },
        end : { type: String, required: true },
        section : { type: String, required: true },
        room : { type: String, required: true },
        instructor: { type: Schema.Types.ObjectId, ref: 'Prof', required: true },
    }],
    passed : [String],
    failed : [String],
});

export default mongoose.model('Student', StudentSchema)