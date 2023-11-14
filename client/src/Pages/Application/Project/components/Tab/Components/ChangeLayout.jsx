import React, { useState } from 'react'
import { CgLayoutGrid, CgLayoutList } from "react-icons/cg"
function ChangeLayout() {
  const [layout, setLayout] = useState("grid");

  const handleGridClick = () => {
    setLayout("grid");
  }

  const handleListClick = () => {
    setLayout("list")
  }

  return (
    <div className='flex border rounded-lg p-1'>
      <button onClick={handleGridClick} className={`transition-all rounded-md ${layout === "grid" ? "bg-indigo-500 text-gray-100 " : "text-gray-500"}`}>
        <CgLayoutGrid size={"2em"} />
      </button>

      <button onClick={handleListClick} className={`transition-all rounded-md ${layout === "list" ? "bg-indigo-500 text-gray-100 " : "text-gray-500"}`}>
        <CgLayoutList size={"2em"} />
      </button>
    </div>
  )
}

export default ChangeLayout