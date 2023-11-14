import React from 'react'
import Contributor from './Contributor'
import AddContributorButton from './AddContributorButton'

function Contributors() {
  return (
    <div>
      <p className='font-bold text-gray-400'>Contributors</p>

      <div className='flex mt-1'>
        <Contributor marginLeft={"ml-0"} zIndex={"z-50"}/>
        <Contributor marginLeft={"ml-[-6px]"} zIndex={"z-40"}/>
        <AddContributorButton marginLeft={"ml-[-6px]"} zIndex={"z-30"}/>
      </div>
    </div>
  )
}

export default Contributors