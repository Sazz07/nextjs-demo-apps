import React from 'react'
import Button from '../button/Button';

const Navbar = () => {
    return (
        <header>
            <div className='bg-emerald-300 flex justify-between p-3 items-center'>
                <div>Logo</div>
                <ul className='flex gap-3 items-center'>
                    <li>Home</li>
                    <li>Blogs</li>
                    <li><Button>Sign up</Button></li>
                </ul>
            </div>
        </header>
    )
}

export default Navbar;