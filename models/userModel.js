import { Schema, model } from 'mongoose';
 
const userSchema = new Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  readingList: { type: Schema.Types.ObjectId, ref: 'Book' },
  createdAt: { type: Date, default: Date.now }
});
 
export default model('User', userSchema);