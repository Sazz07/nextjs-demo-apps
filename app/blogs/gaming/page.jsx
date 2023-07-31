'use client'
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import React from 'react'
import GamingCard from './components/GamingCard';

const Gaming = () => {
    const pathName = usePathname();
    const categoryName = pathName.split('/')[2];
    const { data: blogs, isLoading } = useQuery({
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
        return <h1>Loading........</h1>
    }

    const { blogs: allBlogs } = blogs;

    const categoryBlogs = allBlogs.filter((blog) => blog?.category === categoryName);
    return (
        <section className='max-w-screen-xl mx-auto py-24'>
            <h1 className='text-4xl font-bold uppercase'>{categoryName} Blogs</h1>
            <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-10 py-12'>
                {categoryBlogs.map((categoryBlog) => <GamingCard
                    key={categoryBlog.id}
                    categoryBlog={categoryBlog}
                >
                </GamingCard>)}
            </div>
        </section>
    )
}

export default Gaming;