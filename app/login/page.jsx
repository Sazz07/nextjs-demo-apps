'use client'

import { signUpSchema } from '@/schemas';
import { useFormik } from 'formik';
import Link from 'next/link';
import React from 'react'

const initialValues = {
    name: '',
    password: ''
}

const Login = () => {

    const { values, handleBlur, handleChange, errors, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            console.log("🚀 ~ file: page.jsx:19 ~ Login ~ values:", values)
            action.resetForm();
        }
    });
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg border">
                <div className="px-6 py-4">
                    <h3 className="mt-3 text-xl font-medium text-center">Welcome Back</h3>
                    <p className="mt-1 text-center text-gray-500">Login or create account</p>

                    <form className='space-y-6'>
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

                        <div className="flex items-center justify-between">
                            <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                            <Link href="#" className="text-sm text-gray-600 hover:text-gray-700">Forget Password?</Link>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center">
                    <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
                    <Link href="/register" className="mx-2 text-sm font-bold text-blue-500 hover:underline">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;