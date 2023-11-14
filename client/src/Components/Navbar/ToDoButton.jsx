import React from 'react'
import { BsClipboardCheckFill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

function ToDoButton() {
  const { pathname } = useLocation();
  return (
    <Link to={"/to-do"} className={`${pathname.match("/to-do") ? "bg-gray-800" : "tranparent"} hover:bg-gray-700 flex justify-center items-center text-white transition-all my-1 px-6 rounded-lg shadow-md font-semibold text-bold`}>
      <BsClipboardCheckFill  fontSize={"1.2em"} className='mr-2'/> ToDo
    </Link>
  )
}

export default ToDoButton