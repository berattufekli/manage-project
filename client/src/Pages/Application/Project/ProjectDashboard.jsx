import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Breadcrumb from './components/Breadcrumb'
import Tabs from './components/Tab/Tabs'
import Sidebar from '../../../Components/Sidebar/Sidebar'
import { useDispatch } from 'react-redux'
import { getProjects } from '../../../Store/main/projectsSlice'
import Loading from '../../../Components/Loading/Loading'

function ProjectDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <div className='flex flex-1'>
      <Sidebar />
      <div className='flex m-7 flex-col flex-1 gap-10'>
        <Breadcrumb />
        <Header />
        <Tabs />
      </div>
    </div>
  )
}

export default ProjectDashboard