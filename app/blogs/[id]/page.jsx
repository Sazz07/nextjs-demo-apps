'use client'
import Image from 'next/image';
import React from 'react'

const PostDetails = ({ params: { id } }) => {
  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='w-full flex flex-wrap px-10 md:px-0'>
        <div className='bg-red-500 w-full md:w-3/4'>
          <div className='w-full relative'>
            <Image src={'/blog.jpg'} alt='' width={500} height={500} className='w-full h-96 object-cover'></Image>
            <div className='absolute top-2 left-3'>
              <h1>Category</h1>
            </div>
          </div>
          <div className='space-y-2'>
            <h2 className='text-xl'>Title</h2>
            <h1 className='text-7xl'>Role set leader structure.</h1>
            <p className=''>content_text</p>
          </div>
        </div>
        <div className='h-screen bg-green-500 w-full md:w-1/4'>
        </div>
      </div>
    </div>
  )
}

export default PostDetails;