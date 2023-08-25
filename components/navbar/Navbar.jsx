import React, { useState } from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GetUser from '@/utilities/getUsers';
import { toast } from 'react-hot-toast';
import Button from '../button/Button';
import Image from 'next/image';
import Loading from '../loadingSpinner/Loading';
import { useUrl } from 'nextjs-current-url';




const links = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Blogs",
        url: "/blogs",
    }
];

const Navbar = () => {
    const { href: currentUrl } = useUrl() ?? {};
    const pathName = usePathname();
    const [showMenu, setShowMenu] = useState(false);
    const { data: currentUser, refetch, isLoading } = GetUser();

    const handleLogOut = () => {
        localStorage.removeItem('currentUser');
        toast.success('Logout Successfully');
        refetch();
    };

    console.log(currentUrl);

    return (
        <nav className='bg-gray-50 w-full py-4 px-20 flex justify-between items-center sticky top-0 z-50 shadow-md'>
            <div className='flex items-center justify-between w-full h-8'>
                <Link
                    href={'/'}
                    className='flex items-center gap-1'>
                    <Image src={'/logo.svg'} alt='logo' className='' width={20} height={20}>
                    </Image>
                    <h1 className='font-semibold'>Life<span className='text-teal-700'>Blog</span></h1>
                </Link>
                {showMenu ?
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
                <ul className='hidden md:flex items-center gap-5'>
                    {
                        links.map(link =>
                            <li
                                key={link.url}
                                className={`${pathName === link.url && 'underline underline-offset-4 decoration-inherit decoration-2 text-teal-600'} 
                                    hover:underline hover:underline-offset-4 decoration-inherit decoration-2 hover:text-teal-700 font-medium`}
                            >
                                <Link href={link.url}>{link.title}</Link>
                            </li>)
                    }
                    {/* <li
                        onClick={() => handleLogOut()}
                        className='cursor-pointer hover:underline decoration-inherit decoration-4 hover:text-primary'>
                        Logout
                    </li> */}
                    {/* <Button>Log Out</Button> */}
                </ul>
                <div className='hidden md:block'>
                    {isLoading ? (
                        <Loading></Loading>
                    ) : currentUser && currentUser?.email ? (
                        <div className='group inline-block relative cursor-pointer'>
                            <div className='flex items-center gap-1 text-teal-600 font-bold'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <h2 className='whitespace-nowrap'>{currentUser.name}</h2>
                            </div>
                            <ul className='absolute bg-white hidden group-hover:block py-2 px-1 rounded'>
                                {/* <li>
                                    <Link
                                        href={'/edit'}
                                        className='hover:bg-gray-200 py-2 px-4 whitespace-nowrap block hover:text-primary rounded'
                                    >
                                        Edit
                                    </Link>
                                </li> */}
                                <li
                                    className='hover:bg-gray-200 py-2 px-4 whitespace-nowrap block text-red-600 font-semibold rounded'
                                    onClick={() => handleLogOut()}
                                >
                                    Log Out
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link href={"/login"}>
                            <Button>Sign In</Button>
                        </Link>
                    )}
                </div>
            </div>
            <div>
                <ul className={`bg-gray-900 bg-opacity-90 text-white flex flex-col justify-center items-center gap-5 md:hidden absolute top-16 transition-all duration-500 h-screen ease-in w-full z-100 ${showMenu ? "left-20" : "left-[-678px]"} ${showMenu && "ml-[-5rem]"}`}>
                    {
                        links.map(link => <li key={link.url} className='w-full text-center py-2'>
                            <Link
                                href={link.url}
                                className='text-xl'
                                onClick={() => setShowMenu(false)}
                            >{link.title}
                            </Link>
                        </li>)
                    }
                    <li>
                        <div className=''>
                            {isLoading ? (
                                <Loading></Loading>
                            ) : currentUser && currentUser?.email ? (
                                <div className='group inline-block relative cursor-pointer'>
                                    <div className='flex items-center gap-1 text-teal-600 font-bold'>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="w-6 h-6"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <h2 className='whitespace-nowrap'>{currentUser.name}</h2>
                                    </div>
                                    <ul className='absolute bg-white hidden group-hover:block py-2 px-1 rounded'>
                                        {/* <li>
                                    <Link
                                        href={'/edit'}
                                        className='hover:bg-gray-200 py-2 px-4 whitespace-nowrap block hover:text-primary rounded'
                                    >
                                        Edit
                                    </Link>
                                </li> */}
                                        <li
                                            className='hover:bg-gray-200 py-2 px-4 whitespace-nowrap block text-red-600 font-semibold rounded'
                                            onClick={() => handleLogOut()}
                                        >
                                            Log Out
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <Link
                                    href={"/login"} onClick={() => setShowMenu(false)}>
                                    <Button>Sign In</Button>
                                </Link>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;