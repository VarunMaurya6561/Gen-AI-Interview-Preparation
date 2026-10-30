import axios from 'axios'

const api = axios.create({
    baseURL:'https://gen-ai-interview-preparation.onrender.com',
    // baseURL:'http://localhost:3000',
    withCredentials:true
})

export async function register({username, email, password}){
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        })
    
        return response.data
    } catch (err) {
        throw err
    }
}

export async function verifyEmail(otp){
    try{
        const response = await api.post('/api/auth/verify-mail', {
            otp
        })
        

        return response.data
    }catch(err){
        throw err
    }
}


export async function login({email, password}){
    try {
        const response = await api.post('/api/auth/login',{
            email, password
        })

        return response.data
    } catch (err) {
        throw err
        
    }
} 


export async function logout(){
    try{
        const response = await api.get('/api/auth/logout')

        return response.data
    }catch(err){
        throw err
        
    }
}


export async function getMe(){
    try{
        const response = await api.get('/api/auth/get-me')

        return response.data
    }catch(err){
        throw err
        
    }
}

export async function resetPassApi({email}){
    try {
        const response = await api.post('/api/auth/resetPass', {
            email
        })
    
        return response.data
    } catch (err) {
        throw err
    }
}

export async function resetPassVerifyApi({otp, password}){
    try {
        const response = await api.post('/api/auth/verifyPass', {
            otp, password
        })
    
        return response.data
    } catch (err) {
        throw err
    }
}

