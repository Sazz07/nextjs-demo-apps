import Image from 'next/image';
import React from 'react'

const RelatedCard = () => {
    return (
        <div className='flex flex-wrap gap-3 shadow-sm border rounded-md'>
            <div>
                <Image
                    src={'/blog.jpg'}
                    alt='latestPost_image'
                    width={150}
                    height={100}
                    className='rounded-md'
                >
                </Image>
            </div>
            <div className='text-justify'>
                <h1>Title</h1>
                <p>Description</p>
            </div>
        </div>
    )
}

export default RelatedCard;