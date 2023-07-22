import React, { useState } from 'react'
import Button from '../button/Button';
import Link from 'next/link';
import { RxHamburgerMenu } from "react-icons/rx";

const links = [
    {
        id: 1,
        title: "Home",
        url: "/",
    },
    {
        id: 2,
        title: "Blog",
        url: "/blog",
    },
    {
        id: 3,
        title: "About",
        url: "/about",
    },
    {
        id: 4,
        title: "Dashboard",
        url: "/dashboard",
    },
];

// const Navbar = () => {
//     return (
//         <header>
//             <nav className='bg-emerald-200 w-full md:flex justify-between items-center p-4'>
//                 <h1>Logo</h1>
//                 <div className='flex items-center gap-3'>
//                     <ul className='md:flex gap-3'>
//                         {
//                             links.map(link=> <li key={link.id}><Link href={link.url}>{link.title}</Link></li>)
//                         }
//                     </ul>
//                 </div>
//             </nav>
//         </header>
//     )
// }
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-blue-500 p-4">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                    <a href="/" className="text-white font-bold text-xl">Logo</a>
                </div>
                <div className="hidden md:flex space-x-4">
                    <a href="#" className="text-white hover:bg-blue-600 px-3 py-2 rounded">Home</a>
                    <a href="#" className="text-white hover:bg-blue-600 px-3 py-2 rounded">About</a>
                    <a href="#" className="text-white hover:bg-blue-600 px-3 py-2 rounded">Contact</a>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {isOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16m-7 6h7"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-blue-400 py-2">
                    <a href="#" className="block text-white hover:bg-blue-600 px-3 py-2">Home</a>
                    <a href="#" className="block text-white hover:bg-blue-600 px-3 py-2">About</a>
                    <a href="#" className="block text-white hover:bg-blue-600 px-3 py-2">Contact</a>
                </div>
            )}
        </nav>
    );
};


export default Navbar;