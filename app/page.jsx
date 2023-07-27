'use client'
import Button from "@/components/button/Button";
// import { getBlogPost } from "@/api"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image";

export default function Home() {

  const { data: posts, isLoading } = useQuery({
    queryKey: ['home/posts'],
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
    return <h1>loading....</h1>
  }

  // const title1 = posts.posts[0].title;s
  console.log(posts.blogs);
  return (
    <main>
      {/* banner section start */}
      <section>
        <div className="bg-[url('/banner.webp')] h-screen bg-no-repeat w-full bg-cover bg-center flex items-center">
          <div className="text-white w-full md:w-1/2 px-20 space-y-4">
            <h1 className="text-8xl font-bold">&lt;Blog&gt;</h1>
            <p className="text-lg text-justify font-medium">Welcome to our amazing blog! Explore the latest articles and stay up-to-date with our exciting content. Our team of passionate writers covers a wide range of topics, including technology, travel, health, lifestyle, and much more. Whether you&apos;re a casual reader or a dedicated enthusiast, there&apos;s something for everyone!</p>
            <div>
              <Button>Read the Blog</Button>
            </div>
          </div>
        </div>
      </section>
      {/* banner section end */}
      {/* Blog Post section start */}
      <section className="max-w-7xl mx-auto">
        <h1 className="text-center">Blogs</h1>
        <div className="grid md:grid-cols-2">
          <div>
            <div className="w-full">
              <Image src='/blog.jpg' alt="blog" width={500} height={500}></Image>
            </div>
            <div>
              <h1>asdas</h1>
            </div>
          </div>
        </div>
      </section>
      {/* Blog Post section end */}
    </main>
  )
}
