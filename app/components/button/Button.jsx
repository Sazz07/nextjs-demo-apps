import React from 'react'

const Button = ({ children }) => {
    return (
        <div className='bg-red-300 p-2 rounded-sm'>{children}</div>
    )
}

export default Button;