const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:'https://gen-ai-interview-preparation-website.onrender.com/',
    credentials:true
}))

/* require all the routes*/
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')

/* using all routes here */
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)


module.exports = app