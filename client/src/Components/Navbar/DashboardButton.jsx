import React from 'react'
import { BiSolidDashboard } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

function DashboardButton() {
  const { pathname } = useLocation();

  return (
    <Link to={"/"} className={`${pathname === "/" ? "bg-gray-800" : "tranparent"} hover:bg-gray-700 flex justify-center items-center text-white transition-all my-1 px-6 rounded-lg shadow-md font-semibold text-bold`}>
      <BiSolidDashboard  fontSize={"1.2em"} className='mr-2'/> Dashboard
    </Link>
  )
}

export default DashboardButton