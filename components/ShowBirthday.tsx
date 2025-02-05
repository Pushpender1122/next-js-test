'use client';

import { getUserData } from '@/app/action/actions';
import { User } from '@/model/User';
import React, { useEffect, useState } from 'react';

const ShowBirthday = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchUsers = async (page: number) => {
        setLoading(true);
        try {
            const { data, last } = await getUserData(page);
            setUsers(data);
            setTotalPages(last);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handleDelete = (index: number) => {
        setUsers(prevUsers => prevUsers.filter((_, i) => i !== index));
    };

    return (
        <div className='h-full min-h-screen bg-gray-900 text-white p-6'>
            <h1 className='text-2xl font-bold mb-6 text-center'>User Birthdays</h1>

            {loading ? (
                <h4 className='text-center'>Loading...</h4>
            ) : (
                <div className='flex flex-wrap gap-6 justify-center'>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <div
                                key={user.id}
                                className='bg-gray-800 rounded-xl p-4 shadow-lg  flex flex-col items-center gap-3 relative w-auto'
                            >
                                <div className='flex gap-2'>
                                    {user.uploadUrl.map((url, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            src={url}
                                            alt={user.name}
                                            className='w-20 h-20 rounded-full object-cover border-2 border-gray-500'
                                        />
                                    ))}
                                </div>
                                <div className='text-center'>
                                    <h2 className='text-lg font-semibold'>{user.name}</h2>
                                    <p className='text-gray-400'>{user?.date}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(index)}
                                    className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'>
                                    Delete
                                </button>
                            </div>
                        ))
                    ) : (
                        <p className='text-center text-gray-400'>No users found.</p>
                    )}
                </div>
            )}

            {/* Pagination Buttons */}
            <div className='flex justify-center gap-4 mt-6'>
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-600 transition'>
                    Previous
                </button>

                <span className='text-lg text-gray-300'>
                    Page {page} of {totalPages}
                </span>

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page >= totalPages}
                    className='px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-600 transition'>
                    Next
                </button>
            </div>
        </div>
    );
};

export default ShowBirthday;
