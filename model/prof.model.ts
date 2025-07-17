import mongoose, { Schema, Document } from 'mongoose';


const profSchema = new Schema({
    name : { type: String, required: true },
    email : { type: String, required: true },
    password : { type: String, required: true },
    contact : { type: String, required: true },
    schedules : [{ type: Schema.Types.ObjectId, ref: 'Subject' }],
});

export default mongoose.model('Prof', profSchema)

