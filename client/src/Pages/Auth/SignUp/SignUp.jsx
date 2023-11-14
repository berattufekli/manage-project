import React from 'react'
import useForm from '../../../Hooks/useForm';
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { register } from '../../../Store/auth/authSlice';

const defaultFormState = {
  name: "",
  surname: "",
  email: "",
  password: "",
  confirmPassword: "",
}

function SignUp() {
  const dispatch = useDispatch();
  const { form, setForm, handleChange } = useForm(defaultFormState);

  const handleSubmit = () => {
    dispatch(register(form)).then((params) => {
      try {
        if (params.payload.success) {
          setForm(defaultFormState);
        }
      } catch (error) {
        console.log(error);
      }
    })
  };

  return (
    <div className='flex h-full justify-center items-center w-full'>
      <div className='flex flex-col gap-6'>
        <h1 className='ProjectHeader text-3xl text-gray-800 mb-4'>Create a new account</h1>

        <div className='grid grid-cols-2 gap-4'>
          <div className='col-span-2'>
            <h3 className='font-bold text-lg text-gray-600'>Email</h3>

            <div>
              <input
                placeholder='Email'
                className='mt-1 shadow-sm transition-all focus:bg-transparent 
              bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 
              border-2 text-gray-700 rounded-lg items-center w-full'
                value={form.email}
                name="email"
                id="email"
                onChange={handleChange}
              />
            </div>

          </div>

          <div>
            <h3 className='font-bold text-lg text-gray-600'>Name</h3>

            <div>
              <input
                placeholder='Name'
                className='mt-1 shadow-sm transition-all focus:bg-transparent 
              bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 
              border-2 text-gray-700 rounded-lg items-center w-full'
                value={form.name}
                name="name"
                id="name"
                onChange={handleChange}
              />
            </div>

          </div>

          <div>
            <h3 className='font-bold text-lg text-gray-600'>Surname</h3>
            <input
              placeholder='Surname'
              className='mt-1 shadow-sm transition-all focus:bg-transparent 
              bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 
              border-2 text-gray-700 rounded-lg items-center w-full'
              value={form.surname}
              name="surname"
              id="surname"
              onChange={handleChange}
            />
          </div>

          <div>
            <h3 className='font-bold text-lg text-gray-600'>Password</h3>

            <div>
              <input
                placeholder='Password'
                className='mt-1 shadow-sm transition-all focus:bg-transparent 
              bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 
              border-2 text-gray-700 rounded-lg items-center w-full'
                value={form.password}
                type='password'
                name="password"
                id="password"
                onChange={handleChange}
              />
            </div>

          </div>

          <div>
            <h3 className='font-bold text-lg text-gray-600'>Confirm Password</h3>
            <input
              placeholder='Confirm Password'
              className='mt-1 shadow-sm transition-all focus:bg-transparent 
              bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 
              border-2 text-gray-700 rounded-lg items-center w-full'
              value={form.confirmPassword}
              type='password'
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className='bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold py-2 rounded-lg shadow-lg'>
          Sign Up
        </button>


        <div className='font-semibold text-center text-gray-700'>
          If you have an account. <Link to={"/sign-in"} className="text-indigo-600 hover:text-indigo-500 transition-all cursor-pointer">You can login?</Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp