import React, { useEffect, useState } from 'react'
import PrioritySelect from './PrioritySelect'
import UploadPhoto from './UploadPhoto'
import Team from './Team'
import useForm from '../../../../Hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { addProject } from '../../../../Store/main/projectsSlice'

const defualtFormState = {
  projectName: "",
  projectDescription: "",
  priority: "low",
  url: "",
  team: [
    { userId: 1, role: "member" }
  ]
}

function NewProjectDialog() {
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.auth);
  const { form, handleChange, setInForm } = useForm(defualtFormState);
  const [photo, setPhoto] = useState(null);

  const handleSubmit = () => {
    let data = {
      ...form,
      url: photo,
    }
    dispatch(addProject(data));
  };

  useEffect(() => {
    if (form.team.length === 0) {
      setInForm("team", [{ userId, role: "manager" }]);
    }
  }, [userId, setInForm, form.team.length]);

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='flex flex-col gap-6'>
        <h1 className='ProjectHeader text-3xl text-gray-800 mb-4'>Create New Project</h1>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2'>
          <div>
            <h3 className='font-bold text-lg text-gray-600'>Project Name</h3>
            <input
              placeholder='Project Name'
              className='mt-1 shadow-sm transition-all focus:bg-transparent 
              bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 
              border-2 text-gray-700 rounded-lg items-center'
              value={form.projectName}
              name="projectName"
              id="projectName"
              onChange={handleChange}
            />
          </div>

          <div>
            <h3 className='font-bold text-lg text-gray-600'>Priority</h3>
            <PrioritySelect setInForm={setInForm} />
          </div>


        </div>

        <div className='col-span-2'>
          <h3 className='font-bold text-lg text-gray-600'>Project Description</h3>
          <textarea
            placeholder='Project Description'
            rows={3}
            className='resize-none  mt-1 w-full shadow-sm transition-all 
            focus:bg-transparent bg-gray-100 py-2 px-3 font-bold outline-none
          border-gray-100 border-2 text-gray-700 rounded-lg items-center'
            value={form.projectDescription}
            name="projectDescription"
            id="projectDescription"
            onChange={handleChange}
          />
        </div>

        <div className='col-span-2'>
          <h3 className='font-bold text-lg text-gray-600'>Project Cover</h3>
          <UploadPhoto setInForm={setInForm} form={form} photo={photo} setPhoto={setPhoto}/>
        </div>

        <div className='col-span-2'>
          <h3 className='font-bold text-lg text-gray-600'>Team</h3>
          <Team team={form.team} />
        </div>

        <div className='flex justify-end gap-4'>
          <button className={` bg-red-500 hover:bg-red-400 flex justify-center items-center text-white transition-all py-2 px-6 rounded-lg shadow-md font-semibold`}>
            Cancel
          </button>
          <button onClick={handleSubmit} className={` bg-indigo-600 hover:bg-indigo-500 flex justify-center items-center text-white transition-all py-2 px-6 rounded-lg shadow-md font-semibold`}>
            Create
          </button>
        </div>


      </div>
    </div>
  )
}

export default NewProjectDialog