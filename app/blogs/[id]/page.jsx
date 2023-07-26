'use client'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';
import { useSearchParams } from 'next/navigation'
import { blogImages } from '../components/BlogImages';
import RelatedCard from './components/RelatedCard';

const PostDetails = ({ params: { id } }) => {

  const searchParams = useSearchParams();
  const index = searchParams.get('index');

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

  // RELATED POST CATEGORY WISE 
  const { data: categoryWise, isLoading: categoryLoading } = useQuery({
    queryKey: [`blogs/category`],
    queryFn: async () => {
      try {
        const res = await fetch(`https://api.slingacademy.com/v1/sample-data/blog-posts?&limit=30`);
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
  console.log(blog);
  const { category, title, content_text, photo_url, created_at, description } = blog;
  console.log(category);

  // Formating date
  const dtObject = new Date(created_at);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formDate = dtObject.toLocaleString(undefined, options);

  console.log(formDate);

  // console.log(dtObject);
  console.log(formDate);

  if (categoryLoading) {
    return <h1>Loading.....</h1>
  }

  const { blogs } = categoryWise;
  console.log(blogs);
  const categoryBlog = blogs.filter((blog) => blog?.category === category);
  const restOfBlog = categoryBlog.filter(cate => cate?.id !== parseInt(id));

  console.log('rest', restOfBlog);

  console.log(categoryBlog);

  return (
    <div className='max-w-screen-xl mx-auto px-5 md:px-0 py-5 md:py-14'>
      <div className='w-full md:flex gap-8'>
        <div className='p-2 w-full md:w-3/5 overflow-hidden'>
          <div className='w-full relative'>
            <Image src={blogImages[index]} alt='blog_photo' width={500} height={500} className='w-full h-96 object-cover rounded-lg'></Image>
            <div className='w-full absolute top-0 p-3  flex justify-between items-center'>
              <h1 className='bg-white bg-opacity-70 px-4 py-1 rounded-md uppercase'>{category}</h1>
              <p className='bg-white bg-opacity-70 px-4 py-1 rounded-md'>{formDate}</p>
            </div>
          </div>
          <div className='space-y-2 pt-2'>
            <h2 className='text-gray-500'>{title}</h2>
            <h1 className='text-4xl md:text-5xl font-bold'>{description}</h1>
            <p className='text-justify text-gray-600 text-sm'>{content_text}</p>
          </div>
        </div>
        <div className='w-full md:w-2/5 p-2'>
          <div>
            <h1 className='text-2xl'>Related Post</h1>
            <hr className='border-1 border-black' />
          </div>
          {/* Related blog post start */}
          <div className='pt-5 grid grid-cols-1 gap-8'>
            {
              restOfBlog.map(cat => <RelatedCard
                key={cat.id}
                cat={cat}
              ></RelatedCard>)
            }
          </div>
          {/* Related blog post end */}
        </div>
      </div>
    </div>
  )
}

export default PostDetails;