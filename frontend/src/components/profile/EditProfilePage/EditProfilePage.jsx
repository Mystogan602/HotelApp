import React, { useState, useEffect } from 'react'
import './EditProfilePage.scss'
import { useNavigate } from 'react-router-dom'
import ApiService from '../../../service/ApiService'

const EditProfilePage = () => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await ApiService.getUserProfile()
                setUser(response.user)
            } catch (error) {
                setError(error.response?.data?.message || error.message)
            }
        }
        fetchUserProfile()
    }, [])

    const handleDeleteProfile = async () => {
        if (!window.confirm('Are you sure you want to delete your profile?')) {
            return
        }
        try {
            await ApiService.deleteUser()
            navigate('/login')
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        }
    }

  return (
    <div className='edit-profile-page'>
      <h2>Edit Profile</h2>
      {error && <p className='error-message'>{error}</p>}
      {user && (
        <div className='profile-details'>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phoneNumber}</p>
            <button className='delete-profile-button' onClick={handleDeleteProfile}>Delete Profile</button>
        </div>
      )}
    </div>
  )
}

export default EditProfilePage
