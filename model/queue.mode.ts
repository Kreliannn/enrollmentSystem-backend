import mongoose, { Schema, Document } from 'mongoose';


const QueueSchema = new Schema({
    number : { type: Number, required: true },
    student : { type: Schema.Types.ObjectId, ref: 'Student' },
    date : { type: String, required: true },
});

export default mongoose.model('Queue', QueueSchema)