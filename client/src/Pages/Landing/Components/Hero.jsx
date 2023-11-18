import React from 'react'
import SVG from "./Business_SVG.svg";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className='container lg:h-screen m-auto'>
      <div className='grid h-full gap-10 px-10 xl:px-40 py-40 lg:py-0 lg:mx-0 grid-cols-1 lg:grid-cols-2'>
        <div className='flex justify-center items-center'>
          <img src={SVG} alt='alt' />
        </div>

        <div className='flex flex-col gap-10 justify-center'>
          <h1 className='ProjectHeader text-5xl text-white mb-4'>Effective Project Management Platform</h1>
          <h5 className='font-semibold text-xl text-gray-300'>Take control of your projects with our powerful project management platform. Streamline collaboration, enhance productivity, and achieve success with our innovative tools and features.</h5>

          <div className='grid grid-cols-2 gap-4'>
            <button
              className='ring-2 ring-indigo-600 px-12  transition-all text-white  text-md lg:text-xl font-bold py-6 
              rounded-lg shadow-lg'>
              Explore Features
            </button>

            <Link
              to={"/sign-up"}
              className='flex justify-center bg-indigo-600 px-12 hover:bg-indigo-500 transition-all text-white text-md lg:text-lg font-bold py-6 
              rounded-lg shadow-lg'>
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero