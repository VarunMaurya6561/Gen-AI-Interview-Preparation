const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   username:{
    type: String,
    unique : [true, 'Username alreday taken!'],
    required: true
   } ,

   email:{
    type : String,
    unique:[true, 'account already exist with this email address'],
    required: true
   },

   password:{
    type : String ,
    required: true
   },
   verified:{
      type:Boolean,
      default:false
   }
})


const userModel = mongoose.model('users', userSchema)

module.exports = userModel