import React from 'react'

const Button = ({ children, className, type, onClick, disabled, bgColor, textColor }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            type={type}
            className={`whitespace-nowrap ${bgColor ?? 'bg-teal-600'} py-2 px-3 rounded-md hover:bg-teal-700 ${textColor ?? 'text-white'
                } ${className}`}
        >
            {children}
        </button>
    )
}

export default Button;