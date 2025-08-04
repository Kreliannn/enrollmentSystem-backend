import mongoose, { Schema, Document } from 'mongoose';


const TransactionSchema = new Schema({
    amount : { type: Number, required: true },
    mode : { type: String, required: true },
    student : { type: Schema.Types.ObjectId, ref: 'Student' },
    date : { type: String, required: true },
});

export default mongoose.model('Transaction', TransactionSchema)