import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectProjectById } from '../../../../Store/main/projectsSlice';

function Breadcrumb() {
  const { id } = useParams();
  const { projectName } = useSelector((state) => selectProjectById(state, id));
  return (
    <div>
      <p className='font-bold text-md text-gray-700'>Projects / <span className='text-gray-400'>{projectName}</span></p>
    </div>
  )
}

export default Breadcrumb