import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GetUser from '@/utilities/getUsers';
import { toast } from 'react-hot-toast';


const links = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Blogs",
        url: "/blogs",
    },
    {
        title: "About",
        url: "/about",
    },
    {
        title: "Dashboard",
        url: "/dashboard",
    },
];

const Navbar = () => {
    const pathName = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const { data: currentUser, refetch } = GetUser();

    const handleLogOut = () => {
        localStorage.removeItem('currentUser');
        toast.success('Logout Successfully');
        refetch();
    };

    return (
        <nav className='bg-gray-50 w-full py-6 px-20 flex justify-between items-center sticky top-0 z-50 shadow-md'>
            <div className='flex items-center justify-between w-full'>
                <Link href={'/'}>
                    <h1>Logo</h1>
                </Link>
                {
                    showMenu ?
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 md:hidden"
                            onClick={() => setShowMenu(false)}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        :
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24"
                            strokeWidth={1.5} stroke="currentColor"
                            className="w-6 h-6 md:hidden"
                            onClick={() => setShowMenu(true)}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                }
            </div>
            <div>
                <ul className='hidden md:flex items-center justify-between gap-5'>
                    {
                        links.map(link => <li
                            key={link.url}
                            className='hover:underline decoration-primary decoration-2 hover:text-primary'
                        >
                            <Link href={link.url}>{link.title}</Link>
                        </li>)
                    }
                    <li
                        onClick={() => handleLogOut()}
                        className='cursor-pointer hover:underline decoration-primary decoration-2 hover:text-primary'>
                        Logout
                    </li>
                </ul>
            </div>
            <div>
                <ul className={`bg-red-400 bg-opacity-90 text-white flex flex-col justify-center items-center gap-5 md:hidden absolute top-16 transition-all duration-500 h-screen ease-in w-full z-100 ${showMenu ? "left-20" : "left-[-678px]"} ${showMenu && "ml-[-5rem]"}`}>
                    {
                        links.map(link => <li key={link.id} className='w-full border-t-2 border-b-2 text-center py-2'>
                            <Link
                                href={link.url}
                                className='text-xl'
                                onClick={() => setShowMenu(false)}
                            >{link.title}
                            </Link>
                        </li>)
                    }
                    <li
                        onClick={() => handleLogOut()}
                        className='cursor-pointer'>
                        Logout
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;