'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import BlogCard from './components/BlogCard';



const Blogs = () => {
  const [limit, setLimit] = useState(8);

  const { data: blogsDetails, isLoading, refetch } = useQuery({
    queryKey: ['/blogs', limit],
    queryFn: async () => {
      try {
        const res = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts?&limit=${limit}`);
        const data = res.json();
        return data;
      }
      catch (error) {
        console.log(error);
      }
    }
  });

  const handleShowMore = () => {
    setLimit((prevLimit) => Math.min(prevLimit + 22, 30));
  }

  const handleShowLess = () => {
    setLimit((prevLimit) => Math.max(prevLimit - 22, 8));
  }


  if (isLoading) {
    return <h1>Loading....</h1>
  }

  const { blogs } = blogsDetails;


  return (
    <div className='max-w-screen-xl mx-auto py-12'>
      <h1>Blogs</h1>
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10'>
        {blogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index}></BlogCard>
        ))}
      </div>
      {limit < 30 && (
        <div className='flex justify-center pt-12'>
          <button
            className='bg-blue-600 text-white px-4 py-3 uppercase font-medium'
            onClick={() => {
              handleShowMore();
              refetch();
            }}
          >
            Load More
          </button>
        </div>
      )}
      {limit > 8 && (
        <div className='flex justify-center pt-12'>
          <button
            className='bg-blue-600 text-white px-4 py-3 uppercase font-medium'
            onClick={() => {
              handleShowLess();
              refetch();
            }}
          >
            Load Less
          </button>
        </div>
      )}
    </div>

  )
}

export default Blogs;