'use server'

import axios from "axios"
import fs from "fs"
import path from "path"
export const getDataFromapi = async () => {
    const { data } = await axios.get('https://randomuser.me/api/?page=1&results=2&seed=abc');
    return data.results;
}
export const uploadImage = async (file: any, name: string) => {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filePath = path.join(uploadDir, `${name}.png`);
    fs.writeFileSync(filePath, buffer);
    const uploadUrl = `http://localhost:3000/uploads/${name}.png`;
    const response = await axios.post('http://localhost:4500/users', {
        name,
        uploadUrl
    });
    if (response.status === 201) {
        return true;
    }
}
export const getUserData = async () => {
    const response = await axios.get('http://localhost:4500/users');
    return response.data;
}
