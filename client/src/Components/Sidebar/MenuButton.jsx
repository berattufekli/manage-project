import React, { useState } from 'react'
import { IoMenu, IoClose } from 'react-icons/io5';

function MenuButton() {
  const [active, setActive] = useState(false);


  const handleActive = () => {
    setActive(!active);
  }

  return (
    <div onClick={handleActive} className={`w-12 h-12 transition-all mb-6 rounded-full flex items-center justify-center`}>
      {
        active ? <IoClose size={"2em"} className='text-gray-500' /> : <IoMenu size={"2em"} className='text-gray-500' />
      }
    </div>
  )
}

export default MenuButton