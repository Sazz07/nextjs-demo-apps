import React from 'react'

const Button = ({ children }) => {
    return (
        <button className='bg-primary py-2 px-3 rounded-md hover:bg-[#D83A56]'>{children}</button>
    )
}

export default Button;