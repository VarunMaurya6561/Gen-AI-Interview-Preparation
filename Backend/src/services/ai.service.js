const { GoogleGenAI, Type } = require('@google/genai'); // <-- Added Type import
const { z } = require('zod');
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
});



const geminiResponseSchema = {
    type: Type.OBJECT,
    properties: {
        matchScore: {
            type: Type.NUMBER,
            description: `Calculate matchScore that is between 0 to 100 based on the similarity between Resume and Job description,
                            if Resume and Job description had similarities like how many skills are , give higher matchScore according to how much similarity like ( 50 - 100 ) and if there is no similarity give lower matchScore according to how much similarity like ( 0 to 49 )`
        },

        technicalQuestions: {
            type: Type.ARRAY,
            minItems: 5,
            description: `Generate at least 5 role-specific technical interview questions based on the job description, resume, projects, and identified skill gaps.

            Questions should assess technical knowledge, practical implementation, problem-solving, tools, technologies, and project experience relevant to the target role.

            Provide a clear, technically accurate sample answer for each question. Answers should explain the concept and include a practical example when appropriate.

            Avoid generic questions unrelated to the target role. Do not claim the candidate has experience that is not supported by the provided information.`,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "A clear, specific technical interview question relevant to the target job role, required skills, or candidate projects."
                    },
                    intention: {
                        type: Type.STRING,
                        description: "Explain what the interviewer is evaluating, such as conceptual understanding, practical implementation, debugging, problem-solving, or project knowledge."
                    },
                    answer: {
                        type: Type.STRING,
                        description: "A technically accurate sample answer that directly addresses the question. Include reasoning, relevant examples, code concepts, or implementation details when appropriate."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },

        behavioralQuestions: {
            type: Type.ARRAY,
            minItems: 5,
            description: `Generate at least 5 behavioral or situational interview questions relevant to the target role and candidate background.

            Cover appropriate areas such as teamwork, communication, problem-solving, handling challenges, adaptability, ownership, time management, and learning from mistakes.

            Provide sample answers that are professional, realistic, and adaptable to the candidate's actual experiences. Use the STAR method (Situation, Task, Action, Result) when appropriate.

            Do not invent personal achievements, employment history, or project outcomes. When personal details are unavailable, provide a clearly adaptable sample answer.`,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: {
                        type: Type.STRING,
                        description: "A behavioral or situational interview question designed to evaluate professional behavior, communication, teamwork, adaptability, or decision-making."
                    },
                    intention: {
                        type: Type.STRING,
                        description: "Explain the competency or professional quality the interviewer wants to evaluate."
                    },
                    answer: {
                        type: Type.STRING,
                        description: "A concise, professional sample response based on available candidate information. Prefer the STAR method where suitable and use placeholders or adaptable examples when personal evidence is unavailable."
                    }
                },
                required: ["question", "intention", "answer"]
            }
        },

        skillsGap: {
            type: Type.ARRAY,
            minItems: 5,
            description: `Identify at least 3 meaningful skill gaps between the job requirements and the candidate's demonstrated qualifications.

            Prioritize missing, weakly demonstrated, or insufficiently evidenced skills that matter for the target role.

            Do not classify a skill as missing solely because a resume lacks a keyword if other supplied information demonstrates the skill.

            If fewer than 3 genuine gaps can be established, include relevant skills that need stronger evidence or validation rather than inventing deficiencies.

            Use only the severity values: low, medium, or high.`,
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: {
                        type: Type.STRING,
                        description: "The specific technical skill, tool, concept, qualification, or competency that is missing, weakly demonstrated, or needs further validation."
                    },
                    severity: {
                        type: Type.STRING,
                        description: "The importance of the gap for the target job. Use high for critical requirements, medium for important but learnable gaps, and low for minor or preferred skills.",
                        enum: ["low", "medium", "high"]
                    }
                },
                required: ["skill", "severity"]
            }
        },

        preparationPlan: {
            type: Type.ARRAY,
            minItems: 7,
            description: `Create a practical 7-day interview preparation plan tailored to the job description, resume, technical questions, and identified skill gaps.

            Include exactly 7 daily entries, numbered consecutively from day 1 to day 7.

            Prioritize essential job requirements and high-severity skill gaps. Balance technical learning, hands-on practice, project revision, interview question practice, and mock interview preparation.

            Each day must contain specific topics to study and actionable tasks to complete. Keep the workload realistic for one day and make the plan progressively prepare the candidate for an interview.`,
            items: {
                type: Type.OBJECT,
                properties: {
                    day: {
                        type: Type.NUMBER,
                        description: "The preparation day number, represented as an integer from 1 to 7. Each day must appear exactly once and the days must be consecutive."
                    },
                    topic: {
                        type: Type.ARRAY,
                        minItems: 1,
                        description: "A list of specific subjects, technical concepts, tools, or interview areas to study on that day.",
                        items: {
                            type: Type.STRING
                        }
                    },
                    tasks: {
                        type: Type.ARRAY,
                        minItems: 1,
                        description: "A list of concrete, achievable activities such as solving coding problems, implementing a feature, revising a project, answering practice questions, or completing a mock interview.",
                        items: {
                            type: Type.STRING
                        }
                    }
                },
                required: ["day", "topic", "tasks"]
            }
        },

        title: {
            type: Type.STRING,
            description: "A concise, descriptive title for the interview report. Base it on the target job role or job description. For example, 'Frontend Developer Interview Preparation Report'. Avoid generic titles when the target role is known."
        }
    },

    required: [
        "matchScore",
        "technicalQuestions",
        "behavioralQuestions",
        "skillsGap",
        "preparationPlan",
        "title"
    ]

};


async function generateInterviewReport({resume, selfDescription, jobDescription}){
    const prompt = `Generate a technical interview report based on the following context.
    Resume: ${resume}
    Self Description: ${selfDescription}
    Job Description: ${jobDescription}`;

    try {
        const response = await ai.models.generateContent({
            model: process.env.MODEL, // Use the standard, reliable flash model
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: geminiResponseSchema // Pass the strictly typed native schema here
                
            }
        });
        
        // Parse the text into JSON
        const rawOutput = JSON.parse(response.text);
        
        // Validate it securely with your Zod schema
        // const validatedData = interviewReportSchema_Z.parse(rawOutput);
        // const validatedDataJSON = JSON.stringify(validatedData, null, 2);
        
        // console.log(validatedDataJSON)

        return rawOutput; // Return the validated JSON string

    } catch (error) {
        console.error("Error generating report:", error);
        throw error;
    }
}

async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();

    try {
        const page = await browser.newPage();

        await page.setContent(htmlContent, {
            waitUntil: "networkidle0",
        });

        const pdfBuffer = await page.pdf({
            format: "A4",
            margin: {
                top: "18mm",
                bottom: "18mm",
                left: "16mm",
                right: "16mm",
            },
            printBackground: true,
            preferCSSPageSize: true,
            displayHeaderFooter: true,
            headerTemplate: `
                <div style="width:100%;font-size:9px;color:#64748b;">
                </div>
            `,
            footerTemplate: `
                <div style="
                    width:100%;
                    font-size:9px;
                    color:#64748b;
                    padding:0 16mm;
                    box-sizing:border-box;
                ">
                    <span>
                        Page <span class="pageNumber"></span>
                        of <span class="totalPages"></span>
                    </span>
                </div>
            `,
        });

        return pdfBuffer;
    } finally {
        await browser.close();
    }
}

async function generateResumePdf({ resume, selfDescription, jobDescription}){
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to pdf using library like Puppeteer")
    })

    const prompt = `Generate Better Resume for a candidate with the help of following details : 
                        Resume : ${resume},
                        Self Description: ${selfDescription},
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                        `

    try {
        const response = await ai.models.generateContent({
        model: process.env.MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),   
        }
    })


    const jsonContent = JSON.parse(response.text)

    

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

    } catch (error) {
        throw error
    }

    
}

module.exports = {generateInterviewReport, generateResumePdf};