'use client'
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { blogImages } from '../components/BlogImages';
import RelatedCard from './components/RelatedCard';
import Button from '@/components/button/Button';
import GetUser from '@/utilities/getUsers';
import { toast } from 'react-hot-toast';

const PostDetails = ({ params: { id } }) => {
  // const [readMore, setReadMore] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [editedComment, setEditedComment] = useState({ id: null, text: '' });
  const [isEditing, setIsEditing] = useState(false);

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

  const { data: currentUser } = GetUser();

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

  // handle form submission and add comment to local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== '') {
      const newComment = {
        id: Date.now(),
        userEmail: currentUser?.email,
        userName: currentUser?.name,
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

  // handle comment delete 
  const handleDeleteComment = commentId => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    localStorage.setItem('postComments', JSON.stringify(updatedComments));
    setComments(updatedComments);
  }

  // handle Edit 
  const handleEditComment = (commentId, newText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    );
    localStorage.setItem('postComments', JSON.stringify(updatedComments));
    setComments(updatedComments);
  };

  // handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment({ id: null, text: '' });
  };

  return (
    <div className='max-w-screen-xl mx-auto px-5 md:px-0 py-5 md:py-14'>
      <div className='w-full md:flex gap-8'>
        {/* Blog details start*/}
        <div className='w-full md:w-3/5 overflow-hidden'>
          <div className='w-full'>
            <Image src={photo_url} alt='blog_photo' width={500} height={500} className='w-full h-96 object-cover rounded-lg object-center' priority></Image>
            <div className='w-full absolute top-0 p-3  flex justify-between items-center'>
              <h1 className='bg-white bg-opacity-70 px-4 py-1 rounded-md uppercase'>{category}</h1>
              <p className='bg-white bg-opacity-70 px-4 py-1 rounded-md'>{formDate}</p>
            </div>
          </div>
          <div className='space-y-2 pt-2'>
            <h2 className='text-gray-500'>{title}</h2>
            <h1 className='text-4xl md:text-5xl font-bold'>{description}</h1>
            {/* {readMore ?
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
              )} */}
            <p className='text-justify text-gray-600 text-sm'>{content_text}
            </p>
            {/* {readMore && (
              <p className='text-justify text-gray-600 text-sm'>
                <span
                  className='text-blue-600 cursor-pointer font-medium'
                  onClick={() => setReadMore(false)}
                >Read Less...</span>
              </p>
            )} */}
          </div>
          {/* Comment Form */}
          {(currentUser && currentUser?.email) ? (
            <form className='py-4' onSubmit={handleSubmit}>
              <div className='flex flex-col py-4'>
                <label htmlFor='comment' className='text-xl font-semibold'>
                  Add a Comment
                </label>
                <textarea
                  id='comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows='4'
                  className='border-2 border-gray-400 rounded p-2'
                  placeholder='Type your comment here...'
                >
                </textarea>
              </div>
              <Button type="submit">Comment</Button>
            </form>
          ) : (
            <h1 className='text-center my-20 font-bold text-2xl text-primary'>Login or Sign up to add comment!</h1>
          )}


          {/* Display Comments */}
          <div className=''>
            <h2 className='text-2xl font-semibold'>Comments</h2>
            <hr className='border-1 border-gray-600' />
            {com.length > 0 ? (
              <ul className='my-2 p-2 space-y-2 bg-gray-100 rounded border shadow'>
                {com.map((comment, index) => (
                  <li key={index} className='text-gray-600 p-2 mb-5 shadow-sm'>
                    <div className='flex justify-between'>
                      <div className='text-emerald-700 font-semibold'>
                        <div className='flex items-center gap-1'>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <h1>{comment.userName}:</h1>
                        </div>
                      </div>
                      <div className='flex gap-1'>
                        {currentUser && currentUser.email === comment.userEmail && (
                          <>
                            <button
                              title='Delete'
                              className='bg-red-600 text-white px-1 py-[5px] rounded-md flex items-center text-sm gap-1 hover:bg-red-800'
                              onClick={() => {
                                handleDeleteComment(comment.id);
                                refetch();
                                toast.success('Comment Deleted')
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                            </button>
                            <button
                              title='Edit'
                              className='bg-blue-600 text-white px-1 py-[5px] rounded-md flex items-center text-sm gap-1 hover:bg-blue-800'
                              onClick={() => {
                                // const newText = prompt('Edit your comment:', comment.text);
                                // if (newText) {
                                //   handleEditComment(comment.id, newText);
                                // }
                                setEditedComment({ id: comment.id, text: comment.text });
                                setIsEditing(true);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {/* <small className='pl-7 -mt-10'>{comment.userEmail}</small> */}
                    {editedComment.id === comment.id ? (
                      <div className='flex gap-1 pt-2'>
                        <input
                          type='text'
                          value={editedComment.text}
                          onChange={(e) => setEditedComment({ ...editedComment, text: e.target.value })}
                          className='border-2 border-gray-400 rounded p-1 flex-grow'
                        />
                        <button
                          className='bg-green-600 text-white px-2 py-[5px] rounded-md flex items-center text-sm gap-1 hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed'
                          onClick={() => {
                            handleEditComment(comment.id, editedComment.text);
                            setEditedComment({ id: null, text: '' });
                            refetch();
                          }}
                          disabled={!editedComment.text || !isEditing}
                        >
                          Save
                        </button>
                        <button
                          className='bg-red-600 text-white px-2 py-[5px] rounded-md flex items-center text-sm gap-1 hover:bg-red-800'
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className='bg-transparent w-full p-1 rounded-sm pt-3 text-justify'>{comment.text}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-gray-600'>No comments yet.</p>
            )}
          </div>

        </div>
        {/* Blog details end*/}
        <div className='w-full md:w-2/5 md:sticky md:top-20 h-full'>
          <div>
            <h1 className='text-2xl'>Related Blogs</h1>
            <hr className='border-1 border-black' />
          </div>
          {/* Related blog post start */}
          <div className='pt-5 grid grid-cols-1 gap-8'>
            {
              restOfBlog.map((cat, index) => <RelatedCard
                key={cat.id}
                cat={cat}
              ></RelatedCard>)
            }
          </div>
          {/* Related blog post end */}
        </div>
      </div>
    </div>
    // <div className='max-w-screen-xl mx-auto px-5 md:px-0 py-5 md:py-14'>
    //   <div className='w-full md:flex gap-8'>
    //     <div className='w-full md:w-3/5 overflow-hidden'>
    //       <div className='w-full relative'>
    //         <Image src={photo_url} alt='blog_photo' width={500} height={500} className='w-full h-96 object-cover rounded-lg object-center' priority></Image>
    //         <div className='w-full absolute top-0 p-3  flex justify-between items-center'>
    //           <h1 className='bg-white bg-opacity-70 px-4 py-1 rounded-md uppercase'>{category}</h1>
    //           <p className='bg-white bg-opacity-70 px-4 py-1 rounded-md'>{formDate}</p>
    //         </div>
    //       </div>
    //       <div className='space-y-2 pt-2'>
    //         <h2 className='text-gray-500'>{title}</h2>
    //         <h1 className='text-4xl md:text-5xl font-bold'>{description}</h1>
    //         {readMore ?
    //           (<p className='text-justify text-gray-600 text-sm'>{content_text}
    //           </p>) : (<p className='text-justify text-gray-600 text-sm'>
    //             {content_text.slice(0, 500)}
    //             {content_text.length > 500 && (
    //               <span
    //                 className='text-blue-600 cursor-pointer font-medium'
    //                 onClick={() => setReadMore(true)}
    //               > Read More...
    //               </span>
    //             )}
    //           </p>
    //           )}
    //       </div>
    //     </div>
    //     <div className='w-full md:w-2/5'>
    //       <div>
    //         <h1 className='text-2xl'>Related Post</h1>
    //         <hr className='border-1 border-black' />
    //       </div>
    //       {/* Related blog post start */}
    //       <div className='pt-5 grid grid-cols-1 gap-8'>
    //         {restOfBlog.map(cat => <RelatedCard key={cat.id} cat={cat}></RelatedCard>)}
    //       </div>
    //       {/* Related blog post end */}
    //     </div>
    //   </div>

    //   {/* Comment Form */}
    //   {(currentUser && currentUser?.email) ? (
    //     <form className='py-4' onSubmit={handleSubmit}>
    //       <div className='flex flex-col py-4'>
    //         <label htmlFor='comment' className='text-xl font-semibold'>
    //           Add a Comment:
    //         </label>
    //         <textarea
    //           id='comment'
    //           value={comment}
    //           onChange={(e) => setComment(e.target.value)}
    //           rows='4'
    //           className='border-2 border-gray-400 rounded p-1'
    //           placeholder='Type your comment here...'
    //         >
    //         </textarea>
    //       </div>
    //       <Button type="submit">Submit</Button>
    //     </form>
    //   ) : (
    //     <h1 className='text-center my-20 font-bold text-2xl text-primary'>Login or Sign up to add comment!!</h1>
    //   )}

    //   {/* Display Comments */}
    //   <div className=''>
    //     <h2 className='text-2xl font-semibold'>Comments:</h2>
    //     <hr className='border-1 border-gray-600' />
    //     {com.length > 0 ? (
    //       <ul className='my-2 py-2 space-y-2 bg-gray-100 rounded'>
    //         {com.map((comment, index) => (
    //           <li key={index} className='text-gray-600 p-2 flex items-center gap-2'>
    //             <span className='text-primary flex items-center gap-1 font-semibold'>
    //               <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
    //                 <path strokeLinecap='round' strokeLinejoin='round' d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z' />
    //               </svg>
    //               {comment.userName}:
    //             </span>

    //             {isEditing && editCommentId === comment.id ? (
    //               <>
    //                 <input
    //                   type='text'
    //                   value={editedText}
    //                   onChange={(e) => setEditedText(e.target.value)}
    //                   className='border-2 border-gray-400 rounded p-1'
    //                 />
    //                 <button
    //                   onClick={() => {
    //                     handleEditComment(comment.id, editedText);
    //                     setIsEditing(false);
    //                     setEditCommentId(null);
    //                     setEditedText('');
    //                   }}
    //                   className='text-blue-600'
    //                 >
    //                   Save
    //                 </button>
    //                 <button onClick={() => setIsEditing(false)} className='text-red-600'>
    //                   Cancel
    //                 </button>
    //               </>
    //             ) : (
    //               <>
    //                 <p className='bg-white w-full p-1 rounded-sm'>{comment.text}</p>
    //                 {currentUser && currentUser.email === comment.userEmail && (
    //                   <>
    //                     <button onClick={() => handleDeleteComment(comment.id)} className='text-red-600'>
    //                       Delete
    //                     </button>
    //                     <button
    //                       onClick={() => {
    //                         setIsEditing(true);
    //                         setEditCommentId(comment.id);
    //                         setEditedText(comment.text);
    //                         refetch();
    //                         toast.success('Comment Deleted')
    //                       }}
    //                       className='text-blue-600'
    //                     >
    //                       Edit
    //                     </button>
    //                   </>
    //                 )}
    //               </>
    //             )}
    //           </li>
    //         ))}
    //       </ul>
    //     ) : (
    //       <p className='text-gray-600'>No comments yet.</p>
    //     )}
    //   </div>
    // </div>
  )
}

export default PostDetails;