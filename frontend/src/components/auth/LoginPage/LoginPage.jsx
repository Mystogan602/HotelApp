import React from 'react'
import './LoginPage.scss'
import ApiService from '../../../service/ApiService'
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/home';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please enter email and password')
            setTimeout(() => {
                setError('')
            }, 5000)
            return;
        }

        try {
            const response = await ApiService.loginUser({ email, password })
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token)
                localStorage.setItem('role', response.role)
                navigate(from, { replace: true })
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message)
            setTimeout(() => {
                setError('')
            }, 5000)
        }
    }
  return (
    <div className='auth-container'>
      <h2>Login</h2>
      {error && <p className='error-message'>{error}</p>}
      <form onSubmit={handleSubmit}> 
        <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type='submit'>Login</button>
      </form>

      <p className='register-link'>Don't have an account? <Link to='/register'>Register</Link></p>
    </div>
  )
}

export default LoginPage
