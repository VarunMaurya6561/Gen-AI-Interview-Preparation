import { useContext, useEffect  } from 'react'
import { generateInterviewReport, getInterviewReportById, getAllReport ,generateResumePdf } from '../services/interview.api'
import { InterviewContext } from '../Interview.context'
import { useParams } from "react-router"

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()

    if (!context) {
        throw new Error('useInterview must be used within an InterviewProvider')
    }

    const { loading, setloading, report, setreport, reports, setreports } = context


    const generateReport = async ({ jobDescription, selfDescription, resumeFile }) => {
        setloading(true)
        let response = null

        try {
            response = await generateInterviewReport({ jobDescription, selfDescription, resumeFile })
            setreport(response?.interviewReport ?? null)
        } catch (err) {
            console.log(err)
            setreport(null)
        } finally {
            setloading(false)
        }

        return response?.interviewReport ?? null
    }

    const getReportById = async (interviewId) => {
        setloading(true)
        let response = null

        try {
            response = await getInterviewReportById(interviewId)
            setreport(response?.interviewReport ?? null)
        } catch (err) {
            console.log(err)
            setreport(null)
        } finally {
            setloading(false)
        }

        return response?.interviewReport ?? null
    }

    const getAllReports = async () => {
        setloading(true)
        let response = null

        try {
            response = await getAllReport()
            setreports(response?.interviewReports ?? [])
        } catch (err) {
            console.log(err)
            setreports([])
        } finally {
            setloading(false)
        }

        return response?.interviewReports ?? []
    }

    const getResumePdf = async (interviewId) => {
        setloading(true)
        let response = null
        try {
            response = await generateResumePdf({ interviewId })
            const url = window.URL.createObjectURL(new Blob([ response ], { type: "application/pdf" }))
            const link = document.createElement("a")
            link.href = url
            link.setAttribute("download", `resume_${interviewId}.pdf`)
            document.body.appendChild(link)
            link.click()
        }
        catch (error) {
            console.log('Server Error try after some time!');
            
        } finally {
            setloading(false)
        }
    }




    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        } else {
            getAllReports()
        }
    }, [ interviewId ])

    return { loading, report, reports, generateReport, getReportById, getAllReports, getResumePdf  }
}