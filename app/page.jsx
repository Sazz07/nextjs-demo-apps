'use client'
import Button from "@/components/button/Button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <main>
      {/* banner section start */}
      <section>
        <div className="bg-[url('/banner.webp')] h-screen bg-no-repeat w-full bg-cover bg-center flex items-center bg-fixed">
          <div className="text-white w-full md:w-1/2 px-20 space-y-4">
            <h1 className="text-8xl font-bold">&lt;Blog&gt;</h1>
            <p className="font-medium">Welcome to our amazing blog! Explore the latest articles and stay up-to-date with our exciting content. Our team of passionate writers covers a wide range of topics, including technology, travel, health, lifestyle, and much more. Whether you&apos;re a casual reader or a dedicated enthusiast, there&apos;s something for everyone!</p>
            <div>
              <Button>Read the Blog</Button>
            </div>
          </div>
        </div>
      </section>
      {/* banner section end */}
      {/* Blog categories section start */}
      <section className="max-w-7xl mx-auto py-24">
        <div className="text-center space-y-4 pb-12">
          <h1 className="text-4xl font-bold">Blog Categories</h1>
          <p className="text-2xl">&quot;Love, gaming, programming, math - Explore, play, code, calculate!&quot;</p>
        </div>
        <div className="w-full grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <Link href={`/blogs/love`}>
            <article className="relative cursor-pointer border-0 group">
              <div className="overflow-hidden">
                <Image
                  className="h-96 w-full object-cover object-center transform duration-300 group-hover:scale-110"
                  src={'/love.jpg'}
                  alt="love"
                  width={500}
                  height={500}>
                </Image>
                <div className="absolute bottom-0 text-white bg-black bg-opacity-60 px-5 py-3 space-y-2">
                  <span className="bg-primary text-sm uppercase px-2 py-1 rounded-md">love</span>
                  <p className="text-justify line-clamp-2">Love is a universal language that transcends boundaries and brings people together.</p>
                </div>
              </div>
            </article>
          </Link>
          <article className="relative cursor-pointer border-0 group">
            <div className="overflow-hidden">
              <Image
                className="h-96 w-full object-cover object-center transform duration-300 group-hover:scale-110"
                src={'/gaming.avif'}
                alt="love"
                width={500}
                height={500}>
              </Image>
              <div className="absolute bottom-0 text-white bg-black bg-opacity-60 px-5 py-3 space-y-2">
                <span className="bg-primary text-sm uppercase px-2 py-1 rounded-md">gaming</span>
                <p className="text-justify line-clamp-2">Immerse yourself in the thrilling realm of gaming. From action-packed adventures to mind-bending puzzles, delve into the latest trends, gaming strategies, and updates on your favorite titles.</p>
              </div>
            </div>
          </article>
          <article className="relative cursor-pointer border-0 group">
            <div className="overflow-hidden">
              <Image
                className="h-96 w-full object-cover object-center transform duration-300 group-hover:scale-110"
                src={'/programming.avif'}
                alt="love"
                width={500}
                height={500}>
              </Image>
              <div className="absolute bottom-0 text-white bg-black bg-opacity-60 px-5 py-3 space-y-2">
                <span className="bg-primary text-sm uppercase px-2 py-1 rounded-md">Programming</span>
                <p className="text-justify line-clamp-2">Unlock the power of coding and programming as we take you on a journey through the digital landscape. Learn about programming languages, software development, and innovative tech solutions.</p>
              </div>
            </div>
          </article>
          <article className="relative cursor-pointer border-0 group">
            <div className="overflow-hidden">
              <Image
                className="h-96 w-full object-cover object-center transform duration-300 group-hover:scale-110"
                src={'/math.avif'}
                alt="love"
                width={500}
                height={500}>
              </Image>
              <div className="absolute bottom-0 text-white bg-black bg-opacity-60 px-5 py-3 space-y-2">
                <span className="bg-primary text-sm uppercase px-2 py-1 rounded-md">Math</span>
                <p className="text-justify line-clamp-2">Unravel the beauty and complexity of mathematics. Discover fascinating math concepts, problem-solving techniques, and real-life applications of this fundamental science that shapes the world around us.</p>
              </div>
            </div>
          </article>
        </div>
      </section>
      {/* Blog categories section end */}
    </main>
  )
}
