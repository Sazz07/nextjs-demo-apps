"use client"
import { createUser } from '@/utilities/createUser';
import GetUser from '@/utilities/getUsers';
import { useFormik } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

import * as Yup from 'yup';

const signUpSchema = Yup.object({
  name: Yup.string().min(2).max(25).required('Please enter your name'),
  email: Yup.string().email().required('Please enter your email'),
  password: Yup.string().min(6).required('Please enter your password'),
  confirm_password: Yup.string().required('Please confirm password').oneOf([Yup.ref('password'), null], '*Password must be matched'),
});

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirm_password: '',
  image: null
}



const Register = () => {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);

  const { refetch } = GetUser();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result);
      handleChange({
        target: {
          name: 'image',
          value: reader.result,
        },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values, action) => {
      console.log("🚀 ~ file: page.jsx:28 ~ Register ~ values:", values);
      const result = createUser(values);
      if (result === 'User already exists') {
        toast.error(result)
      } else {
        action.resetForm();
        toast.success(result);
        refetch();
        const intendedDestination = localStorage.getItem('intendedDestination');
        router.push(intendedDestination ?? '/');
        localStorage.removeItem("intendedDestination");
      }
    },
  });

  return (
    <div className='min-h-screen flex justify-center items-center py-20'>
      <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg border">
        <div className="px-6 py-4">
          <h3 className="my-3 text-xl font-medium text-center">Create account</h3>
          {selectedImage && (
            <Image
              className='rounded-full object-cover object-center h-40 w-40 p-5 mx-auto'
              src={selectedImage}
              alt='Uploaded Preview'
              width={500}
              height={500}>
            </Image>
          )
          }
          <form className='space-y-6' onSubmit={handleSubmit}>
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
              </label>
              {
                errors.email && touched.email ?
                  <p className='text-xs text-red-500 font-medium'>{errors.email}</p>
                  : null
              }
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
              </label>
              {
                errors.password && touched.password ?
                  <p className='text-xs text-red-500 font-medium'>{errors.password}</p>
                  : null
              }
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
              </label>
              {
                errors.confirm_password && touched.confirm_password ?
                  <p className='text-xs text-red-500 font-medium'>{errors.confirm_password}</p>
                  : null
              }
            </div>

            {/* Image upload field start */}
            <div>
              {/* <p className='text-sm text-gray-800'>Your Image:</p> */}
              <div className="flex w-full items-center justify-center">
                <label className="w-full flex items-center px-4 py-1 justify-center rounded-lg border-[3px] hover:border-gray-400 text-gray-800 cursor-pointer border-dashed hover:bg-blue-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  {!selectedImage ? (<span className="pl-1">Select a Image</span>) : (<span className="pl-1">Change Image</span>)
                  }
                  <input
                    type='file'
                    className="hidden"
                    onChange={handleImageChange}
                    id='image'
                    name='image'
                    onBlur={handleBlur}
                  />
                </label>
              </div>
            </div>
            {/* Image upload field end */}

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