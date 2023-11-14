import React from 'react'
import Contributors from '../Contributors/Contributors'
import Dashboard from './Dashboard/Dashboard'
import FilterButton from './Components/FilterButton'
import ChangeLayout from './Components/ChangeLayout'

function Tabs() {
  return (
    <div className='flex flex-col gap-10'>
      <div className='flex flex-col gap-10'>
        <div className='flex gap-3'>
          <button className='bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-all py-2 px-6 rounded-lg font-semibold text-bold'>Dashboard</button>
          <button className='bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-all py-2 px-6 rounded-lg font-semibold text-bold'>Tasks</button>
          <button className='bg-gray-800 hover:bg-gray-700 text-white shadow-md transition-all py-2 px-6 rounded-lg font-semibold text-bold'>Communication</button>
        </div>

        <div className='flex items-center justify-between'>
          <Contributors />

          <div className='flex gap-5'>
            <FilterButton />

            <div className='w-[3px] my-2 rounded-lg bg-gray-200'/>

            <ChangeLayout />
          </div>
        </div>
      </div>

      <Dashboard />
    </div>
  )
}

export default Tabs