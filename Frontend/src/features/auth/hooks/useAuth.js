import { useContext, useEffect } from "react"
import { AuthContext } from "../auth.context"
import { register, login, logout, getMe, verifyEmail, resetPassApi , resetPassVerifyApi} from "../services/auth.api"
  import { toast } from 'react-toastify';


export const useAuth = () => {

    const context = useContext(AuthContext)
    const {user, setuser, loading, setloading} = context


    const handleLogin = async ({email, password}) =>{

        setloading(true)
        try{
            const data = await login({email, password})
            setuser(data.user.username)
            
            
            toast.success('Login Successful')
            return true

        }catch(err){
            toast.error(err.response.data.message);
        }finally{
            setloading(false)
        }
        
    }


    const handleRegister = async ({username, email, password}) => {

        setloading(true)
        try {
            
            await register({username, email, password})
            // setuser(data.user.username)
            toast.success('OTP sent')
            return true
        } catch (err) {
            toast.error(err.response.data.message);
        }finally{

            setloading(false)
        }
    }

    const handleOtp = async(otp) => {
        setloading(true)
        try {
            
            const data = await verifyEmail(otp)
            setuser(data.user.username)
            toast.success('user registered')
            return true
        } catch (err) {
            toast.error(err.response.data.message);
        }finally{

            setloading(false)
        }
    }

    const handleResetPass = async({email}) =>{
        setloading(true)
        try {
            await resetPassApi({email})
            toast.success('OTP sent')
            return true
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setloading(false)
        }
    }

    const resetPassVerify = async({otp, password}) => {
        setloading(true)
        try {
            const res = await resetPassVerifyApi({otp, password})
            toast.success('Password updated')
            return true
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            setloading(false)
        }
    }


    const handleLogout =async () => {

        setloading(true)
        try {
            
            await logout()
            setuser(null)
            toast.success('Logged Out')
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{

            setloading(false)
        }
    } 


    useEffect(() => {
        const getAndSetUser = async() => {
            try {
                const data = await getMe()
                setuser(data.user.username)
                
            } catch (error) {
                
                
            }finally{

                setloading(false)
            }
        } 

        getAndSetUser()
    }, [])

    return{user, loading, handleLogin, handleRegister, handleOtp, handleLogout, handleResetPass, resetPassVerify}

}