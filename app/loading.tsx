import React from 'react'
import loading from '@/public/load.webp'
import Image from 'next/image'
const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <Image src={loading} alt="loading" />
        </div>
    )
}

export default Loading
