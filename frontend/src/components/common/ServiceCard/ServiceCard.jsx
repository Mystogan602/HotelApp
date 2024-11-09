import React from 'react'
import './ServiceCard.scss'

const ServiceCard = ({ imageUrl, imageAlt, title, description }) => {
  return (
    <div className='service-card'>
      <img src={imageUrl} alt={imageAlt} />
      <div className='service-details'>
        <h3 className='service-title'>{title}</h3>
        <p className='service-description'>{description}</p>
      </div>
    </div>
  )
}

export default ServiceCard 