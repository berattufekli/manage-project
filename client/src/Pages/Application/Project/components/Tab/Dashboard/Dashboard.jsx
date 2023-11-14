import React from 'react'
import SectionLayout from './Components/SectionLayout'

function Dashboard() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10 sm:gap-0 md:gap-10 w-full justify-between'>
      <SectionLayout sectionTitle={"To Do"} count={3} />
      <SectionLayout sectionTitle={"In Progress"} count={5} />
      <SectionLayout sectionTitle={"Done"} count={7} />
    </div>
  )
}

export default Dashboard