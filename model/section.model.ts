import mongoose, { Schema, Document } from 'mongoose';


const SectionsSchema = new Schema({
    course : { type: String, required: true },
    level : { type: String, required: true },
    sem : { type: String, required: true },
    section : { type: String, required: true },
    subjects : [{ 
        name : { type: String, required: true },
        code : { type: String, required: true },
        units : { type: Number, required: true },
        course : { type: String, required: true },
        prerequisite : { type: String, required: true },
        days : { type: String, required: true },
        start : { type: String, required: true },
        end : { type: String, required: true },
        section : { type: String, required: true },
        room : { type: String, required: true },
        instructor: { type: Schema.Types.ObjectId, ref: 'Prof', required: true },
        students : [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
    }],
    students :  [{ type: Schema.Types.ObjectId, ref: 'Student', required: true }],
});

export default mongoose.model('Sections', SectionsSchema)