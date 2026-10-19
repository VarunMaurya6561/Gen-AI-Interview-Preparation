const userModel = require('../models/user.schema')
const blackListModel = require('../models/blacklist.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


async function registerUser(req, res){
    const {username, email , password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({message : "Please Provide username, email, password"})
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[{username}, {email}]
    })          

    if(isUserAlreadyExist){
        return res.status(400).json({message: "User already exist"})
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign(
        {
            id:user._id,
            username: user.username
        }, process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )

    res.cookie('token', token)


    res.status(201).json({
        message : "new user registered",
        user: {
            id:user._id,
            username : user.username,
            email: user.email
        }
    })
}


async function loginUser(req, res){
    const {email, password} = req.body

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }

    const token = jwt.sign(
        {
            id:user._id,
            username: user.username
        }, process.env.JWT_SECRET,
        {
            expiresIn : '1d'
        }
    )

    res.cookie('token', token)

    res.status(200).json({
        message:"User Logged in successfully",
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


async function logoutUser(req, res){
    const token = req.cookies.token

    if(token){
        await blackListModel.create({token})
    }

    res.clearCookie('token')

    res.status(200).json({
        message:"User loggod-Out"
    })

}

async function getUser(req, res){
    const user = await userModel.findOne({_id:req.user.id})

    res.status(200).json({
        user:{
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



module.exports = {registerUser, loginUser, logoutUser, getUser}


// 36:00
// 1:04:00
// 1:51:00