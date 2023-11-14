import React from 'react'
import Contributor from '../../Project/components/Contributors/Contributor'
import AddContributorButton from '../../Project/components/Contributors/AddContributorButton'

function Team() {
  return (
    <div className='flex'>
      <AddContributorButton marginLeft={"ml-0"} zIndex={"z-30"} height={"h-16"} width={"w-16"} />
      <Contributor marginLeft={"ml-3"} zIndex={"z-50"} height={"h-16"} width={"w-16"} />
      <Contributor marginLeft={"ml-[-10px]"} zIndex={"z-40"} height={"h-16"} width={"w-16"} />

    </div>
  )
}

export default Team