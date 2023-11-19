import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import Contributor from '../../Pages/Application/Project/components/Contributors/Contributor'
import { MdOutlinePersonOutline } from "react-icons/md";
import { PiSignOutBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../Store/auth/authSlice';

function ProfileButton() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  }

  return (
    <div className="text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button>
            <Contributor />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${active ? 'transition-all bg-gray-700 text-gray-100' : 'transition-all text-gray-700'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  >
                    <MdOutlinePersonOutline fontSize={"1.5em"} className='mr-2' />
                    Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`${active ? 'transition-all bg-gray-700 text-gray-100' : 'transition-all text-gray-700'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm font-bold`}
                  >
                    <PiSignOutBold fontSize={"1.5em"} className='mr-2 rotate-180' />
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default ProfileButton