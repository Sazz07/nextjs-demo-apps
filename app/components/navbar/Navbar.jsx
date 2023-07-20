import React from 'react'
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

const Navbar = () => {
    return (
        <header>
            <div className='w-full bg-emerald-300 flex justify-between p-3 items-center'>
                <div>Logo</div>
                <ul className='md:flex gap-3 items-center'>
                    {
                        links.map(link => <Link key={link.id} href={link.url} className='hidden md:block'><li>{link.title}</li></Link>)
                    }
                    <li className='text-xl md:hidden'>
                        <RxHamburgerMenu />
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar;