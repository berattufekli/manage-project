import React from 'react'
import { BsFillCalendar2Fill } from 'react-icons/bs';
import { Link, useLocation } from 'react-router-dom';

function CalendarButton() {
  const { pathname } = useLocation();

  return (
    <Link to={"/calendar"} className={`${pathname === "/calendar" ? "bg-gray-800" : "tranparent"} hover:bg-gray-700 flex justify-center items-center text-white transition-all my-1 px-6 rounded-lg shadow-md font-semibold text-bold`}>
      <BsFillCalendar2Fill fontSize={"1.2em"} className='mr-2' /> Calendar
    </Link>
  )
}

export default CalendarButton