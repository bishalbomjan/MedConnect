const mongoose = require('mongoose')
import {Schema} from mongoose

const doctorSchema = new Schema({
  fullname:String,
  degree:String,
  NMCID:String,
  specializations:String,
  experience:[{
    body: String, date: Date 
  }]
});
const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;
