import React from 'react'
import './Footer.scss'
const Footer = () => {
  return (
    <footer>
      <span className='my-footer'>
        Mys Hotel | All Rights Reserved! &copy; {new Date().getFullYear()}
      </span>
    </footer>
  )
}

export default Footer
