import React, { useEffect } from 'react'
import ProjectItem from './ProjectItem'
import NewProjectButton from './NewProjectButton'
import MenuButton from './MenuButton'
import { useSelector } from 'react-redux'
import { selectProjects } from '../../Store/main/projectsSlice'
import { useNavigate } from 'react-router-dom'

function Sidebar() {
  const projects = useSelector(selectProjects);

  return (
    <div className='h-full hidden lg:flex w-24 bg-white flex-col items-center justify-between gap-6 py-4 border-r-[3px] border-r-gray-200'>
      <div>
        {/* <MenuButton /> */}
        {
          projects.map((item, key) => {
            return <ProjectItem key={key} item={item} />
          })
        }
        <NewProjectButton />
      </div>
    </div>
  )
}

export default Sidebar