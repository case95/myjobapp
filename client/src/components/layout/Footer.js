import React from 'react'

import './Footer.css'

const Footer = ({children}) => {
  const date = new Date();
  return (
    <div className=' footer bg-dark '>
      <p className='d-flex justify-content-center text-secondary pt-3 m-0' >
        {children} copyright { String.fromCharCode(169)}
        {' ' + date.getFullYear()}
      </p>
    </div>
  )
}

export default Footer
