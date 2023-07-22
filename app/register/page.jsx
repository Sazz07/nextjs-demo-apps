'use client'
import { signUpSchema } from '@/schemas';
import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react'

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: ''
}



const Register = () => {

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      action.resetForm()
    }
  });

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg border">
        <div className="px-6 py-4">
          <h3 className="my-3 text-xl font-medium text-center">Create account</h3>
          <form className='space-y-6' autoComplete='none' onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="name">
                <p className='-mb-2 text-sm text-gray-800'>Name:</p>
                <input
                  id='name'
                  className="block w-full px-4 py-2 mt-2 text placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                  type="text"
                  placeholder="Name"
                  aria-label="Name"
                  name='name'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </label>
              {
                errors.name && touched.name ?
                  <p className='text-xs text-red-500 font-medium'>{errors.name}</p>
                  : null
              }
            </div>

            <div className="w-full">
              <label htmlFor="email">
                <p className='-mb-2 text-sm text-gray-800'>Email:</p>
                <input
                  id='email'
                  className="block w-full px-4 py-2 mt-2 text placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  autoComplete='new-email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  errors.email && touched.email ?
                    <p className='text-xs text-red-500 font-medium'>{errors.email}</p>
                    : null
                }
              </label>
            </div>

            <div className="w-full">
              <label htmlFor="password">
                <p className='-mb-2 text-sm text-gray-800'>Password:</p>
                <input
                  id='password'
                  className="block w-full px-4 py-2 mt-2 text placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password"
                  placeholder="Password"
                  aria-label="Password"
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  errors.password && touched.password ?
                    <p className='text-xs text-red-500 font-medium'>{errors.password}</p>
                    : null
                }
              </label>
            </div>

            <div className="w-full">
              <label htmlFor="cPassword">
                <p className='-mb-2 text-sm text-gray-800'>Confirm Password:</p>
                <input
                  className="block w-full px-4 py-2 mt-2 text placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  id='cPassword'
                  name='confirm_password'
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  errors.confirm_password && touched.confirm_password ?
                    <p className='text-xs text-red-500 font-medium'>{errors.confirm_password}</p>
                    : null
                }
              </label>
            </div>
            <div className="flex flex-col">
              <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" type='submit'>
                Create Account
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center justify-center py-4 text-center">
          <span className="text-sm text-gray-600">Already have an account? </span>
          <Link href="/login" className="mx-2 text-sm font-bold text-blue-500 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Register;