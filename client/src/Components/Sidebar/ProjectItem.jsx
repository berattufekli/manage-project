import React, { useState } from 'react'
import { FaAlignCenter } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';

function ProjectItem({ item }) {
  const { id } = useParams();
  return (
    <Link to={`/projects/${item.projectId}`} className={`shadow-md mb-6 w-12 h-12 transition-all rounded-full bg-gray-500 ${id && id === item.projectId.toString() ? "ring-2 ring-offset-2" : "ring-0 ring-offset-0"}  ring-gray-500 flex items-center justify-center`}>
      <FaAlignCenter className='text-gray-300' />
    </Link>
  )
}

export default ProjectItem