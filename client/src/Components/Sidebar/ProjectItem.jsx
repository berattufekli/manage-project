import React, { useState } from 'react'
import { FaAlignCenter } from 'react-icons/fa';

function ProjectItem() {
  const [active, setActive] = useState(false);


  const handleActive = () => {
    setActive(!active);
  }
  return (
    <div onClick={handleActive} className={`shadow-md mb-6 w-12 h-12 transition-all rounded-full bg-gray-500 ${active ? "ring-2 ring-offset-2" : "ring-0 ring-offset-0"}  ring-gray-500 flex items-center justify-center`}>
      <FaAlignCenter className='text-gray-300' />
    </div>
  )
}

export default ProjectItem