'use client'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react'

const PostDetails = ({ params: { id } }) => {
  const { data: postDetails, isLoading } = useQuery({
    queryKey: [`/blogs/${id}`],
    queryFn: async () => {
      try {
        const res = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts/${id}`);
        const data = res.json();
        return data;
      }
      catch (error) {
        console.log(error);
      }
    }
  });

  if (isLoading) {
    return <h1>Loading......</h1>
  }

  const {blog} = postDetails;
  console.log(blog);

  const {category, title, content_text, photo_url, created_at, description} = blog;

  return (
    <div className='max-w-screen-xl mx-auto'>
      <div className='w-full flex flex-wrap px-10 md:px-0'>
        <div className='p-2 w-full md:w-3/4 overflow-hidden'>
          <div className='w-full relative'>
            <Image src={'/blog.jpg'} alt='' width={500} height={500} className='w-full h-96 object-cover rounded-lg'></Image>
            <div className='absolute top-2 left-3'>
              <h1 className='text-xl bg-red-400 text-white px-4 py-1 rounded-md'>{category}</h1>
            </div>
          </div>
          <div className='space-y-2 pt-2'>
            <h2 className='text-xl font-semibold'>{title}</h2>
            <h1 className='text-7xl font-bold'>{description}</h1>
            <p className='text-justify text-gray-600'>{content_text}</p>
          </div>
        </div>
        <div className='w-full md:w-1/4 p-2'>
        <div>
          <h1 className='text-2xl'>Latest post</h1>
          <hr className='border-1 border-black'/>
        </div>
        <div>
          <div>
            {/* <Image src={'/blog.jpg'}></Image> */}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetails;