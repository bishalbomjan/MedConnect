const mongoose = require('mongoose')
import {Schema} from mongoose

const patientSchema = new Schema({
  fullname:String,
  dateOfBirth:Date,

});
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;