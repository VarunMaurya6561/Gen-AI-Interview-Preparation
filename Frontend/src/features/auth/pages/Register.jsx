import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Login from './Login'
import { useAuth } from '../hooks/useAuth'

const Register = () => {
    const navigate = useNavigate()

    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const {loading, handleRegister} = useAuth()

    async function handleSubmit(e){
        e.preventDefault()
        const success = await handleRegister({username, email, password})
        if(success){
            navigate('/otp')                 
        }
    }

    if(loading){
        return <main><h1>Loading......</h1></main>
    }

  return (
    <main>
        <div className="container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="username">Username:</label>
                    <input 
                    onChange={e => {
                        setusername(e.target.value)
                    }}
                    type="text" id='username' name='username' placeholder='Enter username' />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                    onChange={e => {
                        setemail(e.target.value)
                    }}
                    type="email" id='email' name='email' placeholder='Enter Email address' />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password:</label>
                    <input 
                    onChange={e => {
                        setpassword(e.target.value)
                    }}
                    type='password' id='password' name='password' placeholder='Create Your Password' minLength={6} />
                </div>

                <button className='button primary-button'> Register</button>

                <p>Already have an account, <Link to='/login' element={<Login/>} >login</Link> </p>
            </form>
        </div>
    </main>

  )
}

export default Register