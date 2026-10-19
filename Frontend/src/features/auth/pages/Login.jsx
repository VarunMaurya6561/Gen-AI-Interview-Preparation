import { Link, useNavigate } from 'react-router'
import './form.scss'
import Register from './Register'
import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

const Login = () => {
    const navigate = useNavigate()

    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const {loading, handleLogin} = useAuth()

    async function handleSubmit(e){
        e.preventDefault()
        const success = await handleLogin({email, password})

        if(success){
          navigate('/')
        }        
        
    }
    
    if(loading){
        return <main><h1>Loading.......</h1></main>
    }

  return (
    <main>
        <div className="container">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
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
                    type="password" id='password' name='password' placeholder='Enter Your Password' />
                </div>

                <button className='button primary-button' > Login</button>
            </form>

            <p>New user? create account, <Link to='/register' element={<Register/>} >register</Link> </p>
        </div>
    </main>
  )
}

export default Login