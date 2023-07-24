import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-900">
            <div className="container py-6 mx-auto">
                <div className="lg:flex">
                    <div className="w-full -mx-6 lg:w-2/5">
                        <div className="px-6">
                            <Link href="#">
                                <Image
                                    className="w-auto h-7"
                                    src="/blog.jpg"
                                    alt="Blog Logo"
                                    width={500}
                                    height={500}
                                />
                            </Link>

                            <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">Join 31,000+ others and never miss out on new blog posts, tips, tutorials, and more.</p>

                            <div className="flex mt-6 -mx-2">
                                <Link href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Twitter">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Add Twitter SVG path here */}
                                    </svg>
                                </Link>

                                <Link href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Facebook">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Add Facebook SVG path here */}
                                    </svg>
                                </Link>

                                <Link href="#" className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="LinkedIn">
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        {/* Add LinkedIn SVG path here */}
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 lg:mt-0 lg:flex-1">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            <div>
                                <h3 className="text-white uppercase">About</h3>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Company</Link>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Team</Link>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Careers</Link>
                            </div>

                            <div>
                                <h3 className="text-gray-700 uppercase dark:text-white">Blog Categories</h3>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Technology</Link>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Music</Link>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Videos</Link>
                            </div>

                            <div>
                                <h3 className="text-gray-700 uppercase dark:text-white">Products</h3>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Mega Cloud Storage</Link>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Aperion UI Kit</Link>
                                <Link href="#" className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">Meraki UI Library</Link>
                            </div>

                            <div>
                                <h3 className="text-gray-700 uppercase dark:text-white">Contact</h3>
                                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">+1 526 654 8965</span>
                                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">contact@example.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

                <div>
                    <p className="text-center text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} Your Blog Name - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
};


export default Footer;