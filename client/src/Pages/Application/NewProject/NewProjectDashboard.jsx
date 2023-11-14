import React from 'react'
import NewProjectDialog from './components/NewProjectDialog'
import Sidebar from '../../../Components/Sidebar/Sidebar'

function NewProjectDashboard() {
  return (
    <div className='flex flex-1'>
      <Sidebar />
      <div className='flex m-7 flex-col flex-1 gap-10'>
        <NewProjectDialog />
      </div>
    </div>
  )
}

export default NewProjectDashboard