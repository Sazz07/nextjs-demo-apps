import React from 'react'

const Login = () => {
    return (
        <div className='py-20'>
            <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg border">
                <div class="px-6 py-4">
                    <h3 class="mt-3 text-xl font-medium text-center">Welcome Back</h3>

                    <p class="mt-1 text-center text-gray-500">Login or create account</p>

                    <form className='space-y-6'>
                        <div class="w-full">
                            <input class="block w-full px-4 py-2 mt-2 text placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" />
                        </div>

                        <div class="w-full">
                            <input class="block w-full px-4 py-2 mt-2 text placeholder-gray-500 bg-white border rounded-lg focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" />
                        </div>

                        <div class="flex items-center justify-between">
                            <a href="#" class="text-sm text-gray-600 hover:text-gray-700">Forget Password?</a>
                            <button class="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>

                <div class="flex items-center justify-center py-4 text-center">
                    <span class="text-sm text-gray-600">Don&apos;t have an account? </span>

                    <a href="#" class="mx-2 text-sm font-bold text-blue-500 hover:underline">Register</a>
                </div>
            </div>
        </div>
    )
}

export default Login;