import Showdata from '@/components/Showdata'
import React, { Suspense } from 'react'
import Loading from './loading'

const Page = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Showdata />
      </Suspense>
    </div>
  )
}

export default Page
