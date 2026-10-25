const jwt = require('jsonwebtoken')
const blackListModel = require("../models/blacklist.model")

async function authUser(req, res, next){
    const token = req.cookies.token
    

    if(!token){
        return res.json({
            message:"Token not found"
        })
    }


    const isTokenBlacklisted = await blackListModel.findOne({token})
    if(isTokenBlacklisted){
        return res.status(400).json({
            message:"Unauthorized!"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = decoded
        
        next()
    }catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }


}

module.exports = {authUser}
