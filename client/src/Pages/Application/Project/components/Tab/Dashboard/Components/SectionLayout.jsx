import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { HiPlusSm } from 'react-icons/hi'
import Item from './Item'

function SectionLayout({ sectionTitle, count }) {
  return (
    <div className='bg-gray-100 rounded-lg shadow-sm p-4 flex flex-col gap-4'>
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

      <button className='flex justify-center items-center transition-all hover:bg-gray-300 py-2 rounded-md ring-1 ring-gray-400 font-bold text-gray-500 text-sm'>
        Add Card
        <HiPlusSm className='ml-2' size={"1.7em"} />

      </button>
    </div>
  )
}

export default SectionLayout