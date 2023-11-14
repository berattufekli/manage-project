import React from 'react'
import { BiSearch } from "react-icons/bi"

function FilterInput() {
  return (
    <div className='hidden lg:flex items-center px-6 group'>
      <BiSearch size={"1.5em"} className='z-10 text-gray-700 group:transition-all group-focus-within:text-white' />
      <input placeholder='Search' className='flex w-52 ml-[-2.5em] py-[6px] pl-[3em] group:transition-all bg-gray-900 font-bold border-gray-700 text-white border-2 rounded-lg items-center' />
    </div>
  )
}

export default FilterInput