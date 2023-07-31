import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const RelatedCard = ({ cat, index }) => {

    const { id, title, description, photo_url
    } = cat;
    console.log(id);
    return (
        <Link href={`/blogs/${id}`}>
            <div className='flex flex-wrap gap-3 shadow-sm border whitespace-nowrap overflow-hidden hover:bg-gray-100'>
                <div className='w-1/4'>
                    <Image
                        src={photo_url}
                        alt='latestPost_image'
                        width={150}
                        height={100}
                        className='rounded-l-md object-cover object-center'
                    >
                    </Image>
                </div>
                <div className='text-justify py-2 w-2/3'>
                    <h1 className='font-bold text-gray-800'>{title}</h1>
                    <p className='line-clamp-2 text-sm text-gray-600 overflow-hidden'>{`${description.slice(0, 40)}...`}</p>
                </div>
            </div>
        </Link>
    )
}

export default RelatedCard;