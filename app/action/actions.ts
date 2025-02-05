'use server'

import axios from "axios"
import fs from "fs"
import path from "path"
export const getDataFromapi = async () => {
    const { data } = await axios.get('https://randomuser.me/api/?page=1&results=2&seed=abc');
    return data.results;
}
export const uploadImage = async (file: any, name: string, date?: string) => {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    let newName: string = Date.now() + name;
    const filePath = path.join(uploadDir, `${newName}.png`);
    fs.writeFileSync(filePath, buffer);

    const isIt = await axios.get(`http://localhost:4500/users?name=${name}`);
    console.log("this is data", isIt.data)
    console.log("this is length", isIt.data.length)
    var uploadUrl
    if (isIt.data.length === 0) {

        uploadUrl = `http://localhost:3000/uploads/${newName}.png`;
        const response = await axios.post('http://localhost:4500/users', {
            name,
            uploadUrl: [uploadUrl],
            date
        });
        if (response.status === 201) {
            return true;
        }
    } else {
        uploadUrl = `http://localhost:3000/uploads/${newName}.png`;
        isIt.data[0].uploadUrl.push(uploadUrl)
        console.log("this is over ", isIt.data)
        const res = await axios.put(`http://localhost:4500/users/${isIt.data[0].id}`, {
            name,
            uploadUrl: isIt.data[0].uploadUrl,
            date
        });
        if (res.status === 200) {
            return true;
        }
    }
}
export const getUserData = async (page: number) => {
    try {
        const response = await axios.get(`http://localhost:4500/users?_page=${page}&_per_page=5`);
        return response.data;
    } catch (error) {
        console.log(error)
    }
}
