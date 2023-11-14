import React from 'react'
import { BsPlus } from 'react-icons/bs';

function AddContributorButton({ marginLeft, zIndex, width, height }) {
  return (
    <div className={`${width ? width : "w-8"} ${height ? height : "h-8"} flex items-center justify-center border-2 border-dashed border-gray-300 ring-white rounded-full ${marginLeft} ${zIndex}`}>
      <BsPlus size={"2em"} className='text-gray-300' />
    </div>
  )
}

export default AddContributorButton