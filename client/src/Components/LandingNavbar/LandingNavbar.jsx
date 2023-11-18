import React from 'react'
import Logo from "./logo.svg"
import { Link, useLocation } from 'react-router-dom'

function LandingNavbar() {
  const location = useLocation();
  return (
    <div className='fixed justify-center items-center w-full'>
      <div className='flex  items-center justify-between  bg-gray-700 container m-auto mt-4 py-3 px-4 rounded-lg shadow-lg'>
        <div className='flex gap-10'>
          <img src={Logo} alt="logo" className='w-6 cursor-pointer' />

          <Link
            to={"/"}
            className={`text-white font-semibold p-2 
              ${location.pathname === "/" ? 'bg-indigo-600 hover:bg-indigo-500' : "bg-transparent hover:bg-indigo-600"} 
              transition-all  rounded-md`
            }
          >
            Home
          </Link>
          <Link
            to={"/features"}
            className={`text-white font-semibold p-2 
            ${location.pathname === "/features" ? 'bg-indigo-600 hover:bg-indigo-500' : "bg-transparent hover:bg-indigo-600"} 
            transition-all  rounded-md`
          }
          >
            Features
          </Link>
          <Link
            to={"/about-us"}
            className={`text-white font-semibold p-2 
            ${location.pathname === "/about-us" ? 'bg-indigo-600 hover:bg-indigo-500' : "bg-transparent hover:bg-indigo-600"} 
            transition-all  rounded-md`
          }
          >
            About Us
          </Link>
        </div>




        <Link className='bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-semibold py-2 px-4 shadow-md rounded-md' to={"/sign-in"}>Sign In</Link>
      </div>
    </div>
  )
}

export default LandingNavbar