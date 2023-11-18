import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import Item from './Item'

function SectionLayout({ sectionTitle, count }) {
  return (
    <div className=' ring-1 mb-7 bg-gray-50 ring-gray-100 rounded-lg shadow-sm p-4 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <p className='font-bold text-md text-gray-700'>{sectionTitle}</p>
          <p className='bg-violet-100 rounded-lg text-sm flex items-center justify-center font-bold text-indigo-900 w-6 h-6'>{count}</p>
        </div>
        <BsThreeDots className='text-gray-500' size={"1.5em"} />
      </div>

      <Item
        taskTitle={"Input Fields"}
        taskType={"Design System"}
        taskTypeBg={"bg-amber-100"}
        taskTypeText={"text-amber-800"}
      />

      <Item
        taskTitle={"Screen-size Research"}
        taskType={"UX & Research"}
        taskTypeBg={"bg-purple-100"}
        taskTypeText={"text-purple-700"}
      />

      <button className='flex justify-center items-center transition-all bg-white shadow-md py-2 rounded-md  font-bold text-gray-700 text-sm'>
        Add Card
        <HiPlusSm className='ml-2' size={"1.7em"} />

      </button>
    </div>
  )
}

export default SectionLayout