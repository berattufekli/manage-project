import React, { useState } from 'react'
import DashboardButton from './DashboardButton'
import ProjectsButton from './ProjectsButton'
import CalendarButton from './CalendarButton'
import ToDoButton from './ToDoButton'
import FilterInput from './FilterInput'
import { IoClose, IoMenu } from 'react-icons/io5'
import ProfileButton from './ProfileButton'

function Navbar() {

  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  }

  return (
    <div className='flex justify-between shadow-lg py-4 bg-gray-900'>
      <div className='flex'>
        <div onClick={handleActive} className='lg:hidden w-12 flex my-2 mx-6'>
          {
            active ? <IoClose size={"2em"} className='text-gray-500' /> : <IoMenu size={"2em"} className='text-gray-500' />
          }
        </div>

        <div className='lg:flex hidden gap-2 xl:gap-4' >
          <div className='w-12 h-12 rounded-full mx-6 bg-gray-700'></div>
          <DashboardButton />
          <ProjectsButton />
          <CalendarButton />
          <ToDoButton />
        </div>
      </div>



      <div className='flex items-center mx-6'>
        <FilterInput />
        <ProfileButton />
      </div>
    </div>
  )
}

export default Navbar