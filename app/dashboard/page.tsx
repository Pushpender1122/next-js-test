'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'

const page = () => {
    const searchParams = useSearchParams()

    const search = searchParams.get('data')
    return (
        <div>
            dashboard
            <br />
            {search}
        </div>
    )
}

export default page
