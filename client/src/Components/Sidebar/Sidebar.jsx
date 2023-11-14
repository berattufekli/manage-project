import React from 'react'
import ProjectItem from './ProjectItem'
import NewProjectButton from './NewProjectButton'
import MenuButton from './MenuButton'

function Sidebar() {
  return (
    <div className='h-full hidden lg:flex w-24 bg-white flex-col items-center justify-between gap-6 py-4 border-r-[3px] border-r-gray-200'>
      <div>
        <MenuButton />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <ProjectItem />
        <NewProjectButton />
      </div>
    </div>
  )
}

export default Sidebar