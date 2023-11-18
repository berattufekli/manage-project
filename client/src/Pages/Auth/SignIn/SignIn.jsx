import React from 'react'
import useForm from '../../../Hooks/useForm';
import { FaGithub, FaTwitter } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { login } from '../../../Store/auth/authSlice';


const defaultFormState = {
  email: "",
  password: "",
}

function SignIn() {
  const dispatch = useDispatch();
  const { form, handleChange } = useForm(defaultFormState);

  const handleSubmit = () => {
    dispatch(login(form));
  }
  return (
    <div className='flex h-full justify-center items-center w-full'>
      <div className='flex flex-col gap-6'>
        <h1 className='ProjectHeader text-3xl text-gray-800 mb-4'>Sign in to your account</h1>
        <div>
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
          <div className='flex justify-between items-center'>
            <h3 className='font-bold text-lg text-gray-600'>Password</h3>
            <h3 className='font-bold text-sm text-indigo-600'>Forgot password?</h3>
          </div>
          <input
            placeholder='Password'
            className='mt-1 shadow-sm transition-all focus:bg-transparent 
              bg-gray-100 py-2 px-3 font-bold outline-none border-gray-100 
              border-2 text-gray-700 rounded-lg items-center w-full'
            value={form.password}
            name="password"
            id="password"
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className='bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold py-2 rounded-lg shadow-lg'>
          Sign In
        </button>

        <div className="flex justify-center items-center">
          <p className='z-10 bg-white px-3 font-semibold text-gray-700'>Or continue with</p>
          <div className='h-[1px] w-80 bg-gray-300 absolute'></div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <button className='flex items-center justify-center transition-all hover:bg-sky-400 bg-sky-500 shadow-md font-bold rounded-lg text-white py-1.5'>
            <FaTwitter className='mr-2' fontSize={"1.5em"} />
            Twitter
          </button>

          <button className='flex items-center justify-center transition-all hover:bg-gray-800 bg-gray-900 shadow-md font-bold rounded-lg text-white py-1.5'>
            <FaGithub className='mr-2' fontSize={"1.5em"} />
            GitHub
          </button>


        </div>

        <div className='font-semibold text-gray-700'>
          If you don't have an account. <Link to={"/sign-up"} className="text-indigo-600 hover:text-indigo-500 transition-all cursor-pointer">Create a new one?</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn