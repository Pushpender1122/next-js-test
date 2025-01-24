'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const searchParams = useSearchParams()

    const search = searchParams.get('data')
    return (
        <div>
            dashboard
            sdf
            < br />
            this is my code
            This is how thing are working
            {search}
        </div >
    )
}

export default page
