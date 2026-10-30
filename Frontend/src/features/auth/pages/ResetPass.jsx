import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Login from './Login'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

const ResetPass = () => {
    const {handleResetPass} = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(email === ''){
            return toast.error('Enter Valid Email')
        }
        const success = await handleResetPass({email})
        if(success){
            navigate('/verifyPassOtp')
        }
    }

  return (
    <main>
        <div className="container">
            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit} >
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    type="email" id='email' name='email' placeholder='Enter Email address' />
                </div>
                <button className='button primary-button' > Send OTP</button>
            </form>

            <p><Link to='/login' element={<Login/>} >back</Link></p>
        </div>
    </main>
  )
}

export default ResetPass