import React from 'react'
import { MdManageSearch } from "react-icons/md"

function FilterButton() {
  return (
    <button className='flex font-bold text-gray-500 px-4 border-2 rounded-xl py-2 items-center'>
      <MdManageSearch size={"1.5em"} className='mr-2'/>
      Filter
    </button>
  )
}

export default FilterButton