import React from 'react'
import './Register.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../service/ApiService'

const RegisterPage = () => {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
    })

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData
        if (!name || !email || !password || !phoneNumber) {
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) {
            setErrorMessage('Please fill in all fields')
            setTimeout(() => {
                setErrorMessage('')
            }, 5000)
            return
        }
        try {
            const response = await ApiService.registerUser(formData)

            // Check if the response is successful
            if (response.statusCode === 200) {
                //clear the form fields
                setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phoneNumber: '',
                })
                setSuccessMessage('Registration successful! Please login.')
                setTimeout(() => {
                    setSuccessMessage('')
                    navigate('/login')
                }, 3000)
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message)
            setTimeout(() => {
                setErrorMessage('')
            }, 5000)
        }
    }
  return (
    <div className='auth-container'>
        {errorMessage && <p className='error-message'>{errorMessage}</p>}
        {successMessage && <p className='success-message'>{successMessage}</p>}
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor='email'>Email</label>
                <input type='email' id='email' name='email' value={formData.email} onChange={handleInputChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' name='password' value={formData.password} onChange={handleInputChange} required />
            </div>
            <div className='form-group'>
                <label htmlFor='phoneNumber'>Phone Number</label>
                <input type='tel' id='phoneNumber' name='phoneNumber' value={formData.phoneNumber} onChange={handleInputChange} required />
            </div>
            <button type='submit'>Register</button>
        </form>
        <p className='login-link'>Already have an account? <Link to='/login'>Login</Link></p>
    </div>
  )
}

export default RegisterPage
