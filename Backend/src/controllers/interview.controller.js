const interviewReportModel = require('../models/interviewReport.model')
const pdfParse = require('pdf-parse')
const {generateInterviewReport, generateResumePdf} = require('../services/ai.service')

async function interview(req, res){
    const resumeFile = req.file
    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(resumeFile.buffer))).getText()
    const resumeText = resumeContent.text
    
    
    const { selfDescription, jobDescription} = req.body

    const interviewReportByAi = await generateInterviewReport({resume:resumeContent, selfDescription, jobDescription})
    
    const interviewReport = await interviewReportModel.create({
        user:req.user.id,
        resume: resumeText,
        selfDescription,
        jobDescription,
        ...interviewReportByAi
    })

    // console.log(interviewReportByAi.technicalQuestions);
    

    res.status(201).json({
        message : "Interview Report Generated",
        interviewReport
    })
}


async function getReportById(req, res){
    const { interviewId } = req.params
    
    const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id})
    
    if(!interviewReport){
        return res.status(404).json({
            message : "Interview Report Not Found"
        })
    }

    res.status(200).json({
        message:"Interview Report fetched",
        interviewReport
    })
}

async function getAllReportsByUser(req, res){
    const interviewReports = await interviewReportModel.find({user:req.user.id}).sort({createdAt:-1}).select('-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillsGap -preparationPlan')

    // if(!interviewReports || interviewReports.length === 0){
    //     return res.status(404).json({
    //         message : "No Interview Reports Found"
    //     })
    // }

    res.status(200).json({
        message:"All Interview Reports fetched",
        interviewReports
    })
}

async function generateResumePdfController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport
    

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = {
    interview,
    getReportById,
    getAllReportsByUser,
    generateResumePdfController
}
