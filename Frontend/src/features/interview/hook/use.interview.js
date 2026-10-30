import { useContext, useEffect  } from 'react'
import { generateInterviewReport, getInterviewReportById, getAllReport ,generateResumePdf, delReportByIdApi } from '../services/interview.api'
import { InterviewContext } from '../Interview.context'
import { useNavigate, useParams } from "react-router"
import { toast } from 'react-toastify';

export const useInterview = () => {
    const context = useContext(InterviewContext)
    const { interviewId } = useParams()
    const navigate = useNavigate()

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
            toast.error(err.response.data.message);
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
            navigate('/')
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

    const delReportById = async (interviewId) => {
        setloading(true)

        try {
            await delReportByIdApi(interviewId)
            toast.success("Report Deleted")
            return true
        } catch (error) {
            toast.error(error? error.response.data.message: "Report Deletion Failed")
            return false
        } finally {
            setloading(false)
        }

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
            console.log( error.response?.data?.message || error);
            toast.error("PDF is not Generated, Try after some time!")
            
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

    return { loading, report, reports, generateReport, getReportById, getAllReports, getResumePdf ,delReportById }
}