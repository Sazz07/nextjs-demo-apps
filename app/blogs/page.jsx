'use client'
// import { getBlogPost } from '@/api'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import BlogCard from './components/BlogCard'

const Blogs = () => {
    // const { data: posts, isLoading } = useQuery({
    //     queryKey: ['/blogs'],
    //     queryFn: getBlogPost
    // })
    const [showCard, setShowCard] = useState(8);
    const { data: posts, isLoading } = useQuery({
        queryKey: ['/blogs'],
        queryFn: async () => {
            try {
                const res = await fetch('https://api.slingacademy.com/v1/sample-data/blog-posts?limit=30');
                const data = res.json();
                return data;
            }
            catch (error) {
                console.log(error);
            }
        }
    })

    if (isLoading) {
        return <h1>Loading..........</h1>
    }

    const { blogs } = posts;

    const handleShowMore = () => {
        setShowCard(prevShowCard => prevShowCard + 4);
    }

    const handleShowLess = () => {
        setShowCard(prevShowCard => prevShowCard - 4);
    }

    return (
        <div>
            <h1>All Blogs</h1>
            <div className="max-w-screen-xl mx-auto">
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {
                        blogs.slice(0, showCard).map(blog => <BlogCard
                            key={blog.id}
                            blog={blog}
                        >
                        </BlogCard>)
                    }
                </div>
                {showCard < blogs.length && (<button onClick={handleShowMore}>Show More</button>)}
                {showCard > 8 && (<button onClick={handleShowLess}>Show less</button>)}
            </div>
        </div>
    )
}

export default Blogs;