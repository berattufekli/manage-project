import React, { useEffect } from 'react'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import { useDispatch } from 'react-redux';
import { getProjects } from '../../../Store/main/projectsSlice';

function ProjectLanding() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);
  return (
    <div className='flex flex-1'>
      <Sidebar />
      <div className='flex m-7 flex-col flex-1 gap-10'>
        <p className='ProjectHeader text-4xl mb-2 text-gray-800'>Dashboard</p>
      </div>
    </div>

  )
}

export default ProjectLanding