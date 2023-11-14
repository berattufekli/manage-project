import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { FaAngleRight, FaAngleDown } from "react-icons/fa6";

const people = [
  { id: 1, name: 'Low', color: "bg-green-500" },
  { id: 2, name: 'Medium', color: "bg-amber-500" },
  { id: 3, name: 'High', color: "bg-red-500" },
]

function PrioritySelect({ setInForm }) {

  const [selected, setSelected] = useState(people[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    console.log(event);
    setInForm("priority", event.name);
    setSelected(event);
  }

  const handleClick = () => { setIsOpen(!isOpen) };

  return (
    <div >
      <Listbox value={selected} onChange={handleChange}>
        <div className="relative">
          <Listbox.Button onClick={handleClick} className='flex justify-between items-center mt-1 w-full shadow-sm transition-all focus:bg-transparent bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 border-2 text-gray-700 rounded-lg text-left'>
            <div className='flex items-center'>
              <span className={`${selected.color} w-3 h-3 rounded-full mr-2`}>

              </span>
              <span className="block truncate text-gray-700">{selected.name}</span>
            </div>


            <FaAngleRight 
              className={`z-10 text-gray-700 transition-all ${isOpen ? "rotate-90" : "rotate-0"} group:transition-all group-focus-within:text-white`}
            />

          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {people.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default font-semibold select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (

                    <>
                      <span className={`block truncate}`}>

                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">

                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default PrioritySelect