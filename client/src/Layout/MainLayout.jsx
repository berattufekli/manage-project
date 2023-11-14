import React from 'react'
import Navbar from '../Components/Navbar/Navbar'

function MainLayout({ children }) {
  return (
    <div className='h-screen flex flex-col bg-white'>
      <Navbar />
      <div className='flex h-full'>
        {children}
      </div>
    </div>
  )
}

export default MainLayout