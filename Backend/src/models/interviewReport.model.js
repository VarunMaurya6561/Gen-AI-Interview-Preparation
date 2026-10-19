const mongoose = require('mongoose')


const technicalQuestionsSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    intention:{
        type: String,
        required: true
    },
    answer:{
        type:String,
        required:true
    }
},{
    _id:false
})


const behavioralQuestionsSchema  = new mongoose.Schema({
    question:{
        type:String,
        required:true,
    },
    intention:{
        type: String,
        required: true
    },
    answer:{
        type:String,
        required:true
    }
},{
    _id:false
})



const skillsGapSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        enum:['low', 'medium', 'high'],
        required:true
    }
},{
    _id:false
})


const preparationPlanSchema = new mongoose.Schema({
    day:{
        type:Number,
        required:true
    },
    topic:[{
        type: String
    }],
    tasks: [{
    type: String
    }]
},{
    _id:false
})

const interviewReportSchema = new mongoose.Schema({

    jobDescription:{
        type: String,
        required: true,
    },
    resume:{
        type:String,
    },
    selfDescription:{
        type: String
    },
    matchScore:{
        type: Number,
        min : 0,
        max : 100
    },

    technicalQuestions:[ technicalQuestionsSchema ],
    behavioralQuestions:[ behavioralQuestionsSchema ],
    skillsGap:[ skillsGapSchema ],
    preparationPlan:[ preparationPlanSchema],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    }

},{
    timestamps:true
})


const interviewReportModel = mongoose.model('interviewReport', interviewReportSchema)

module.exports = interviewReportModel