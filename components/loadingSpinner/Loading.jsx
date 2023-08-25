import React from 'react'

const Loading = () => {
    return (
        <div className="flex items-center justify-center space-x-2 h-screen">
            <div className="w-3 h-3 rounded-full animate-pulse bg-teal-700"></div>
            <div className="w-3 h-3 rounded-full animate-pulse bg-teal-700"></div>
            <div className="w-3 h-3 rounded-full animate-pulse bg-teal-700"></div>
        </div>
    )
}

export default Loading;