'use client'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { blogImages } from '../components/BlogImages';
import RelatedCard from './components/RelatedCard';
import Button from '@/components/button/Button';

const PostDetails = ({ params: { id } }) => {
  const [readMore, setReadMore] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const searchParams = useSearchParams();
  const index = searchParams.get('index');

  //post details
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

  const { data: com, isLoading: commentsLoading, refetch } = useQuery({
    queryKey: ['/blog/comments'],
    queryFn: () => {
      try {
        const existingComments = JSON.parse(localStorage.getItem('postComments')) || [];
        const data = existingComments.filter((c) => c.postId === id);
        setComments(data);
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
  const { category, title, content_text, photo_url, created_at, description } = blog;

  // Formating date
  const dtObject = new Date(created_at);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formDate = dtObject.toLocaleString(undefined, options);

  if (categoryLoading) {
    return <h1>Loading.....</h1>
  }

  const { blogs } = categoryWise;

  const categoryBlog = blogs.filter((blog) => blog?.category === category);
  const restOfBlog = categoryBlog.filter(cate => cate?.id !== parseInt(id));

  if (commentsLoading) {
    return <h1>Loading...</h1>
  }

  // Function to handle form submission and add comment to local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      const newComment = {
        id: Date.now(),
        postId: id,
        text: comment,
      };
      const existingComments = JSON.parse(localStorage.getItem('postComments')) || [];
      const updatedComments = [...existingComments, newComment];
      localStorage.setItem('postComments', JSON.stringify(updatedComments));
      setComments(updatedComments);
      setComment('');
      refetch();
    }
  };

  return (
    <div className='max-w-screen-xl mx-auto px-5 md:px-0 py-5 md:py-14'>
      <div className='w-full md:flex gap-8'>
        <div className='p-2 w-full md:w-3/5 overflow-hidden'>
          <div className='w-full relative'>
            <Image src={blogImages[index]} alt='blog_photo' width={500} height={500} className='w-full h-96 object-cover rounded-lg' priority></Image>
            <div className='w-full absolute top-0 p-3  flex justify-between items-center'>
              <h1 className='bg-white bg-opacity-70 px-4 py-1 rounded-md uppercase'>{category}</h1>
              <p className='bg-white bg-opacity-70 px-4 py-1 rounded-md'>{formDate}</p>
            </div>
          </div>
          <div className='space-y-2 pt-2'>
            <h2 className='text-gray-500'>{title}</h2>
            <h1 className='text-4xl md:text-5xl font-bold'>{description}</h1>
            {readMore ?
              (<p className='text-justify text-gray-600 text-sm'>{content_text}
              </p>) : (<p className='text-justify text-gray-600 text-sm'>
                {content_text.slice(0, 500)}
                {content_text.length > 500 && (
                  <span
                    className='text-blue-600 cursor-pointer font-medium'
                    onClick={() => setReadMore(true)}
                  > Read More...
                  </span>
                )}
              </p>
              )}
            {/* {readMore && (
              <p className='text-justify text-gray-600 text-sm'>
                <span
                  className='text-blue-600 cursor-pointer font-medium'
                  onClick={() => setReadMore(false)}
                >Read Less...</span>
              </p>
            )} */}
          </div>
        </div>
        <div className='w-full md:w-2/5'>
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

      {/* Comment Form */}
      <form className='pt-4' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label htmlFor='comment' className='text-xl font-semibold'>
            Add a Comment:
          </label>
          <textarea
            id='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows='4'
            className='border rounded p-2'
            placeholder='Type your comment here...'
          >
          </textarea>
        </div>
        <Button type="submit">Submit</Button>
      </form>

      {/* Display Comments */}
      <div className='pt-4'>
        <h2 className='text-2xl font-semibold'>Comments</h2>
        <hr className='border-1 border-black' />
        {com.length > 0 ? (
          <ul className='pt-4 space-y-2'>
            {com.map((comment, index) => (
              <li key={index} className='text-gray-600'>
                {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-gray-600'>No comments yet.</p>
        )}
      </div>
    </div>
  )
}

export default PostDetails;