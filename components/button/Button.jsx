import React from 'react'

const Button = ({ children, className, type, onClick, disabled, bgColor, textColor }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`whitespace-nowrap ${bgColor ?? 'bg-primary'} py-2 px-3 rounded-md hover:bg-[#D83A56] ${textColor ?? 'text-white'
                } ${className}`}
        >
            {children}
        </button>
    )
}

export default Button;