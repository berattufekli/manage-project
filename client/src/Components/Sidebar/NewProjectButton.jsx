import React, { useState } from 'react'
import { HiOutlinePlus } from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';

function NewProjectButton() {
  const { pathname } = useLocation();

  return (
    <Link to={"/projects/new"} className={`w-12 shadow-md h-12 transition-all rounded-full bg-indigo-500 hover:bg-indigo-400 ${pathname === "/projects/new" ? "ring-2 ring-offset-2" : "ring-0 ring-offset-0"}  ring-indigo-500 hover:ring-indigo-400 flex items-center justify-center`}>
      <HiOutlinePlus size={"1.5em"} className='text-white' />
    </Link>
  )
}

export default NewProjectButton