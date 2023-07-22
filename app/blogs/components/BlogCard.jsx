import React from 'react'

const BlogCard = () => {
    return (
        <div className="relative flex items-end  w-full text-left bg-center bg-cover h-96 dark:bg-gray-500 cursor-pointer" style={{ backgroundImage: "url('https://source.unsplash.com/random/240x320')" }}>
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b via-transparent from-gray-900 to-gray-900"></div>
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between mx-5 mt-3">
                <a rel="noopener noreferrer" href="#" className="px-3 py-2 text-xs font-semibold uppercase dark:text-gray-100 bgundefined">Politics</a>
                <div className="flex flex-col text-center dark:text-gray-100">
                    <span className="text-3xl font-semibold">04</span>
                    <span className="uppercase">Aug</span>
                </div>
            </div>
            <h2 className="z-10 p-5">
                <a href="#" className="font-medium text-md hover:underline text-gray-100">Autem sunt tempora mollitia magnam non voluptates</a>
            </h2>
        </div>
    )
}

export default BlogCard;