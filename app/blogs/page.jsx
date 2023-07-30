'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import BlogCard from './components/BlogCard';
import Button from '@/components/button/Button';



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
    setLimit((prevLimit) => Math.min(prevLimit + 12, 20));
  }

  const handleShowLess = () => {
    setLimit((prevLimit) => Math.max(prevLimit - 12, 8));
  }


  if (isLoading) {
    return <h1>Loading....</h1>
  }

  const { blogs } = blogsDetails;


  return (
    <div className='max-w-screen-xl mx-auto py-24'>
      <h1 className='text-4xl font-bold'>Blogs</h1>
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10 py-12'>
        {blogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index}></BlogCard>
        ))}
      </div>
      {limit < 20 && (
        <div className='flex justify-center pt-12'>
          <Button
            onClick={() => {
              handleShowMore();
              refetch();
            }}
          >
            Load More
          </Button>
        </div>
      )}
      {limit > 8 && (
        <div className='flex justify-center pt-12'>
          <Button
            onClick={() => {
              handleShowLess();
              refetch();
            }}
          >
            Load Less
          </Button>
        </div>
      )}
    </div>

  )
}

export default Blogs;