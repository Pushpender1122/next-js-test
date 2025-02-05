'use client';

import { uploadImage } from '@/app/action/actions';
import React, { useState } from 'react';
import ShowBirthday from './ShowBirthday';

const BirthdayInput: React.FC = () => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [images, setImages] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [show, setShow] = useState<boolean>(false);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const newFiles = Array.from(selectedFiles);
            setFiles(prevFiles => [...prevFiles, ...newFiles]);

            newFiles.forEach(file => {
                const reader = new FileReader();
                reader.onload = () => {
                    setImages(prevImages => [...prevImages, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        for (const file of files) {
            await uploadImage(file, name, date);
        }
        setFiles([]); // Clear selected files after submission
        setImages([]); // Clear preview images after submission
    };

    return (
        <>
            <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg flex gap-8 items-center">
                    {/* Left Side Inputs */}
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="p-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>

                    {/* Right Side Image Upload */}
                    <div className="flex flex-col items-center gap-4">
                        <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => setShow(!show)}>
                            Show Birthday
                        </label>
                        <label className="cursor-pointer text-white px-4 py-2 rounded-lg">
                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" multiple />
                            <div className="w-24 h-24 flex items-center justify-center rounded-full border-2 border-gray-500 overflow-hidden">
                                <span className="text-gray-400">Upload</span>
                            </div>
                        </label>

                        {/* Image Previews */}
                        {images.length > 0 && (
                            <div className="mt-4 max-w-[300px] flex flex-wrap gap-2 p-2 border border-gray-600 rounded-lg overflow-auto">
                                {images.map((img, index) => (
                                    <img key={index} src={img} alt={`Uploaded ${index}`} className="w-24 h-24 object-cover rounded-md border border-gray-400" />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {show && <ShowBirthday />}
        </>
    );
};

export default BirthdayInput;
