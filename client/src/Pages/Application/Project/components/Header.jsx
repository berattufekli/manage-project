import React from 'react'
import { useSelector } from 'react-redux';
import { selectProjectById } from '../../../../Store/main/projectsSlice';
import { useParams } from 'react-router-dom';

function Header() {
  const { id } = useParams();
  const { projectName, projectDescription, priority } = useSelector((state) => selectProjectById(state, id));

  const renderPriority = () => {
    if (priority === "Low") {
      return <p className='text-sm font-bold bg-green-200 ring-2 ring-green-500 text-green-500 
      rounded-md px-4'>{priority}</p>
    }
    else if (priority === "Medium") {
      return <p className='text-sm font-bold bg-amber-200 ring-2 ring-amber-500 text-amber-500 
      rounded-md px-4'>{priority}</p>
    }
    else {
      return <p className='text-sm font-bold bg-red-200 ring-2 ring-red-500 text-red-500 
      rounded-md shadow-md px-4'>{priority}</p>
    }
  }

  return (
    <div>
      <div className='flex items-center gap-4'>
        <p className='ProjectHeader text-4xl text-gray-800'>{projectName}</p>

        {
          renderPriority()
        }
      </div>
      <p className='text-md font-semibold mb-2 text-gray-400'>{projectDescription}</p>
      <p className='text-md font-semibold text-gray-400'>Updated 1 day ago</p>
    </div>
  )
}

export default Header