import React from 'react'
import Contributor from '../../../Contributors/Contributor'
import { BsCalendar4, BsClipboard2Check } from 'react-icons/bs'

function Item({ taskTitle, taskType, taskTypeBg, taskTypeText }) {
  return (
    <div className='bg-white flex flex-col ring-2 ring-gray-300 shadow-sm rounded-md p-2'>
      <p className='font-bold text-gray-700'>{taskTitle}</p>

      <div className='flex items-end justify-between mt-2'>
        <p className={`${taskTypeBg} ${taskTypeText} font-bold text-sm py-1 px-4 rounded-md`}>{taskType}</p>

        <div className='flex'>
          <Contributor />
          <Contributor marginLeft={"ml-[-6px]"} />
        </div>
      </div>

      <div className='h-1 my-4 rounded-lg bg-gray-100' />

      <div className='flex justify-between items-center'>
        <p className='flex text-gray-700 gap-1 text-sm font-bold'>
          <BsClipboard2Check size={"1.3em"} />
          2/5
        </p>

        <p className='flex text-gray-700 gap-1 text-sm font-bold'>
          <BsCalendar4 size={"1.3em"} />
          31.08.2023
        </p>
      </div>
    </div>
  )
}

export default Item