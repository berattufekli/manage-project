import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import LandingNavbar from '../Components/LandingNavbar/LandingNavbar'

function LandingLayout({ children }) {
  return (
    <div className='h-screen flex flex-col bg-white'>
      <LandingNavbar />
      {children}
    </div>
  )
}

export default LandingLayout