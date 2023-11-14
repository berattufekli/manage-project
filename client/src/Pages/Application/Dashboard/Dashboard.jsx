import React from 'react'
import { useSelector } from 'react-redux';

function Dashboard() {
  const {value} = useSelector((state) => state.counter);

  return (
    <div>
    <p className='ProjectHeader text-4xl mb-2 text-gray-800'>Dashboard {value}</p>
    
  </div>
  )
}

export default Dashboard