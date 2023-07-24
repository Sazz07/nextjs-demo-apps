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

  const { blog } = postDetails;
  const { category, title, content_text, photo_url, created_at, description } = blog;

  // Formating date
  const dtObject = new Date(created_at);
  const formDate = dtObject.toLocaleString();
 
  // console.log(dtObject);
  console.log(formDate);
  return (
    <div className='max-w-screen-xl mx-auto px-5 md:px-0 py-5 md:py-14'>
      <div className='w-full flex flex-wrap'>
        <div className='p-2 w-full md:w-3/4 overflow-hidden'>
          <div className='w-full relative'>
            <Image src={photo_url} alt='blog_photo' width={500} height={500} className='w-full h-96 object-cover rounded-lg'></Image>
            <div className='w-full absolute top-0 p-3  flex justify-between items-center'>
              <h1 className='bg-red-400 text-white px-4 py-1 rounded-md uppercase'>{category}</h1>
              <p className='bg-red-400 text-white px-4 py-1 rounded-md'>{formDate}</p>
            </div>
          </div>
          <div className='space-y-2 pt-2'>
            <h2 className='text-xl text-gray-500'>{title}</h2>
            <h1 className='text-4xl md:text-6xl font-bold'>{description}</h1>
            <p className='text-justify text-gray-600'>{content_text}</p>
          </div>
        </div>
        <div className='w-full md:w-1/4 p-2'>
          <div>
            <h1 className='text-2xl'>Latest post</h1>
            <hr className='border-1 border-black' />
          </div>
          {/* Latest blog post start */}
          <div className='pt-5 grid grid-cols-1 gap-8'>
            {/* latest blog post card start */}
            <div className='flex flex-wrap gap-3 shadow-sm border rounded-md'>
              <div>
                <Image
                  src={'/blog.jpg'}
                  alt='latestPost_image'
                  width={150}
                  height={100}
                  className='rounded-md'
                >
                </Image>
              </div>
              <div className='text-justify'>
                <h1>Title</h1>
                <p>Description</p>
              </div>
            </div>
            {/* latest blog post card end */}
             {/* latest blog post card start */}
             <div className='flex flex-wrap gap-3'>
              <div>
                <Image
                  src={'/blog.jpg'}
                  alt='latestPost_image'
                  width={150}
                  height={100}
                  className='rounded-md'
                >
                </Image>
              </div>
              <div className='text-justify'>
                <h1>Title</h1>
                <p>Description</p>
              </div>
            </div>
            {/* latest blog post card end */}
             {/* latest blog post card start */}
             <div className='flex flex-wrap gap-3'>
              <div>
                <Image
                  src={'/blog.jpg'}
                  alt='latestPost_image'
                  width={150}
                  height={100}
                  className='rounded-md'
                >
                </Image>
              </div>
              <div className='text-justify'>
                <h1>Title</h1>
                <p>Description</p>
              </div>
            </div>
            {/* latest blog post card end */}
             {/* latest blog post card start */}
             <div className='flex flex-wrap gap-3'>
              <div>
                <Image
                  src={'/blog.jpg'}
                  alt='latestPost_image'
                  width={150}
                  height={100}
                  className='rounded-md'
                >
                </Image>
              </div>
              <div className='text-justify'>
                <h1>Title</h1>
                <p>Description</p>
              </div>
            </div>
            {/* latest blog post card end */}
             {/* latest blog post card start */}
             <div className='flex flex-wrap gap-3'>
              <div>
                <Image
                  src={'/blog.jpg'}
                  alt='latestPost_image'
                  width={150}
                  height={100}
                  className='rounded-md'
                >
                </Image>
              </div>
              <div className='text-justify'>
                <h1>Title</h1>
                <p>Description</p>
              </div>
            </div>
            {/* latest blog post card end */}
          </div>
          {/* Latest blog post end */}
        </div>
      </div>
    </div>
  )
}

export default PostDetails;