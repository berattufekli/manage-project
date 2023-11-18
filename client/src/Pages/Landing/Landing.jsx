import React from 'react'
import LandingNavbar from '../../Components/LandingNavbar/LandingNavbar'
import Hero from './Components/Hero'
import Features from './Components/Features'

function Landing() {
  return (
    <div className='w-full bg-gray-800'>
      <LandingNavbar />
      <Hero />
      {/* <Features /> */}
    </div>
  )
}

export default Landing