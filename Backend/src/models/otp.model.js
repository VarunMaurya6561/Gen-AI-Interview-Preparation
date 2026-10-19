const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otpHash: {
        type:String,
        required:true
    },
    attempts: {
        type: Number,
        default: 0
    }
},{
    timestamps: true
})

const otpModel = mongoose.model('otps', otpSchema)

module.exports = otpModel