'use client'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import BlogCard from './components/BlogCard';

const Blogs = () => {
  // const [limit, setLimit] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: blogsDetails, isLoading, refetch } = useQuery({
    queryKey: ['/blogs'],
    queryFn: async () => {
      try {
        const res = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts?&limit=20`);
        const data = res.json();
        return data;
      }
      catch (error) {
        console.log(error);
      }
    }
  });

  // const handleShowMore = () => {
  //   setLimit((prevLimit) => Math.min(prevLimit + 12, 20));
  // }

  // const handleShowLess = () => {
  //   setLimit((prevLimit) => Math.max(prevLimit - 12, 8));
  // }


  if (isLoading) {
    return <h1>Loading....</h1>
  }

  const { blogs } = blogsDetails;


  const filterBlogsByCategory = (category) => {
    return category === 'all' ? blogsDetails.blogs : blogsDetails.blogs.filter((blog) => blog.category === category);
  };

  const filteredBlogs = filterBlogsByCategory(selectedCategory);


  return (
    <div className='max-w-screen-xl mx-auto py-24 px-10 md:px-0'>
      <h1 className='text-4xl font-bold'>Blogs</h1>
      {/* Filter button Start*/}
      <div className='hidden md:flex py-6 gap-10 justify-center'>
        <button className='border-2 px-3 py-1 border-teal-600 hover:bg-teal-600 hover:text-white rounded font-medium' onClick={() => setSelectedCategory('all')}>All</button>
        <button className='border-2 px-3 py-1 border-teal-600 hover:bg-teal-600 hover:text-white rounded font-medium' onClick={() => setSelectedCategory('love')}>Love</button>
        <button className='border-2 px-3 py-1 border-teal-600 hover:bg-teal-600 hover:text-white rounded font-medium' onClick={() => setSelectedCategory('math')}>Math</button>
        <button className='border-2 px-3 py-1 border-teal-600 hover:bg-teal-600 hover:text-white rounded font-medium' onClick={() => setSelectedCategory('gaming')}>Gaming</button>
        <button className='border-2 px-3 py-1 border-teal-600 hover:bg-teal-600 hover:text-white rounded font-medium' onClick={() => setSelectedCategory('programming')}>Programming</button>
        {/* Filter button End */}
      </div>
      {/* Dropdown start */}
      <div className='lg:hidden py-6'>
        <select
          className='block w-full rounded-md border border-gray-600 shadow-sm focus:border-teal-600 focus:ring focus:ring-teal-600 focus:ring-opacity-50 p-2'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value='all'>All</option>
          <option value='love'>Love</option>
          <option value='math'>Math</option>
          <option value='gaming'>Gaming</option>
          <option value='programming'>Programming</option>
          {/* Add more options for other categories as needed */}
        </select>
      </div>
      {/* Dropdown end */}
      <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10 py-12'>
        {filteredBlogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index}></BlogCard>
        ))}
      </div>
      {/* {limit < 20 && (
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
      )} */}
    </div>

  )
}

export default Blogs;