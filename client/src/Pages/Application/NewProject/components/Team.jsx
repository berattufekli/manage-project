import React from 'react'
import Contributor from '../../Project/components/Contributors/Contributor'
import AddContributorButton from '../../Project/components/Contributors/AddContributorButton'

function Team({ team }) {
  return (
    <div className='flex'>
      <AddContributorButton marginLeft={"ml-0"} zIndex={"z-30"} height={"h-16"} width={"w-16"} />

      {
        team.map((item, key) => {
          return <Contributor key={key} marginLeft={"ml-3"} zIndex={"z-50"} height={"h-16"} width={"w-16"} />
        })
      }

    </div>
  )
}

export default Team