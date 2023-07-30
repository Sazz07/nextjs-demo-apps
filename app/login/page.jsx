'use client'
import Button from '@/components/button/Button';
import GetUser from '@/utilities/getUsers';
import loginUser from '@/utilities/loginUser';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

import * as Yup from 'yup';

const logInSchema = Yup.object({
    email: Yup.string().email().required('Please provide your email'),
    password: Yup.string().required('Please provide your password'),
});

const initialValues = {
    email: '',
    password: ''
}

const Login = () => {
    const router = useRouter();
    const [open, setOpen] = useState({
        password: false
    });

    const { refetch } = GetUser();

    const { values, handleBlur, handleChange, errors, handleSubmit, touched } = useFormik({
        initialValues,
        validationSchema: logInSchema,
        onSubmit: (values, action) => {
            console.log("🚀 ~ file: page.jsx:19 ~ Login ~ values:", values)
            const result = loginUser(values);
            if (result === "No users found. Please sign up first.") {
                toast.error(result);
            } else if (result === "Invalid email or password") {
                toast.error(result);
            } else {
                action.resetForm();
                toast.success(result);
                refetch();
                const intendedDestination = localStorage.getItem(
                    "intendedDestination"
                );
                router.push(intendedDestination ?? "/");
                localStorage.removeItem("intendedDestination");
            }
        }
    });

    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg border">
                <div className="px-6 py-4">
                    <h3 className="mt-3 text-xl font-medium text-center">Welcome Back</h3>
                    <p className="mt-1 text-center text-gray-500">Login or create account</p>

                    <form className='space-y-6' onSubmit={handleSubmit}>
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
                            <Button type="submit">Sign In</Button>
                            <Link href="#" className="text-sm text-gray-600 hover:text-gray-700">Forget Password?</Link>
                        </div>
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center">
                    <span className="text-sm text-gray-600">Don&apos;t have an account? </span>
                    <Link href="/register" className="mx-2 text-sm font-bold text-primary hover:underline">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;