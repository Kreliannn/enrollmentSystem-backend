import mongoose, { Schema, Document } from 'mongoose';


const coursesSchema = new Schema({
    course : { type: String, required: true },
    code : { type: String, required: true },
    year : [{
        level : { type: String, required: true },
        subjects : [{
            name : { type: String, required: true },
            code : { type: String, required: true },
            units : { type: String, required: true },
            type : { type: String, required: true },
        }]
    }],
});

export default mongoose.model('Courses', coursesSchema)