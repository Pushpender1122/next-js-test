import React from 'react'
import { getUserData } from '../action/actions';
import { User } from '@/model/User';

const Page = async () => {
    const data = await getUserData();
    return (
        <div>
            {data.map((user: User) => {
                return (
                    <div key={user.id} className="flex items-center space-x-4">
                        <img src={user.uploadUrl} alt={user.name} className="w-12 h-12 rounded-full" />
                        <p className="text-lg font-semibold text-gray-800">{user.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Page
