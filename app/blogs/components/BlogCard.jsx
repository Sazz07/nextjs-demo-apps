'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { blogImages } from './BlogImages';



const BlogCard = ({ blog, index }) => {
    const { id, category, content_text, created_at, description, photo_url, title } = blog;

    // Formatting Date/Time
    const dtObject = new Date(created_at);
    const options = { day: 'numeric', month: 'long' };
    const formDate = dtObject.toLocaleString(undefined, options);

    return (
        <Link href={`/blogs/${id}`}>
            <div className='relative'>
                <div className=''>
                    <Image src={photo_url} width={500} height={500} alt='blogsPhoto' className='w-full rounded-t-md md:h-52'
                        priority></Image>
                </div>
                <div className='absolute top-3 right-3 bg-white bg-opacity-60 rounded-md px-2 py-1 flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                        className="w-5 h-4 text-gray-800">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formDate}</span>
                </div>
                <div className='space-y-2 p-3 border-2 border-t-0 border-gray-200 rounded-b-md'>
                    <h3 className='text-gray-500 uppercase'>{category}</h3>
                    <h1 className='text-xl font-semibold line-clamp-1'>{title}</h1>
                    <p className='text-justify line-clamp-4 text-sm'>{content_text}</p>
                    <Link href={`/blogs/${id}?index=${index}`}>
                        <button className='text-sm text-blue-700 pt-5'>Read More...</button>
                    </Link>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard;