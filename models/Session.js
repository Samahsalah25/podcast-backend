const mongoose=require('mongoose');
const sessionSchema = mongoose.Schema({
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
  teacherRating: { type: Number, min: 1, max: 5 },
  studentRating: { type: Number, min: 1, max: 5 },
  feedback: { type: String },
  meetingUrl: { type: String } // رابط الاجتماع
});
const SessionSchema=mongoose.model('Session' ,sessionSchema)
module.exports=SessionSchema;