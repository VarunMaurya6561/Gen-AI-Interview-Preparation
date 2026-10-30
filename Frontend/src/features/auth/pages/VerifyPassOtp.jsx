import React, { useState } from 'react'
import Login from './Login'
import { Link, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-toastify'

const VerifyPassOtp = () => {
    const navigate = useNavigate()
    const {resetPassVerify} = useAuth()
    const [otp, setOtp] = useState(null)
    const [password, setPassword] = useState('')

    const handleSubmit = async(e) => {
            e.preventDefault()
            if(otp === '' || password === ''){
                return toast.error('Enter OTP and Password!')
            }
            const success = await resetPassVerify({otp, password})
            if(success){
                navigate('/login')
            }
        }

  return (
    <main>
        <div className="container">
            <h1>Enter OTP</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="otp">OTP:</label>
                    <input
                    onChange={e => {
                        setOtp(e.target.value)
                    }}
                    type="text" id='email' name='otp' placeholder='Enter OTP' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                    type="password" id='password' name='password' placeholder='Enter Your Password'  />
                </div>

                <button className='button primary-button' > Change Password</button>
            </form>

            <p><Link to='/login' element={<Login/>} >Back</Link></p>
        </div>
    </main>
  )
}

export default VerifyPassOtp