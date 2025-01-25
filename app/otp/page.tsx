'use client';

import React, { useState, useRef } from 'react';

const Page: React.FC = () => {
    const [otp, setOtp] = useState<{ [key: string]: string }>({
        '0': '',
        '1': '',
        '2': '',
        '3': '',
        '4': '',
    });
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        const currentIndex = Number(name);

        // Update OTP value
        setOtp((prev) => ({
            ...prev,
            [name]: value.slice(0, 1), // Ensure only 1 digit is stored
        }));

        // Move to the next input if a value is entered
        if (value && currentIndex < 4) {
            inputsRef.current[currentIndex + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { name } = e.target as HTMLInputElement;
        const currentIndex = Number(name);

        if (e.key === 'Backspace' && otp[name] === '') {
            // Move to the previous input on backspace if the current input is empty
            if (currentIndex > 0) {
                inputsRef.current[currentIndex - 1]?.focus();
            }
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 5); // Limit pasted data to 5 characters
        const updatedOtp: { [key: string]: string } = { ...otp };

        for (let i = 0; i < pasteData.length; i++) {
            if (i < 5) {
                updatedOtp[i] = pasteData[i];
                inputsRef.current[i]?.focus();
            }
        }

        setOtp(updatedOtp);
        e.preventDefault();
    };

    return (
        <div className="flex space-x-2">
            {Object.keys(otp).map((key, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputsRef.current[index] = el;
                    }}
                    type="text"
                    name={key}
                    value={otp[key]}
                    maxLength={1}
                    className="text-black border border-gray-300 rounded w-10 h-10 text-center"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                />
            ))}
        </div>
    );
};

export default Page;
