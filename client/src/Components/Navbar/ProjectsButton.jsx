import React from 'react'
import { FaFolderOpen } from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

function ProjectsButton() {
  const { pathname } = useLocation();
  return (
    <Link to={"/projects"} className={`${pathname.match("/projects") ? "bg-gray-800" : "tranparent"} hover:bg-gray-700 flex justify-center items-center text-white transition-all my-1 px-6 rounded-lg shadow-md font-semibold text-bold`}>
      <FaFolderOpen  fontSize={"1.2em"} className='mr-2'/> Projects
    </Link>
  )
}

export default ProjectsButton