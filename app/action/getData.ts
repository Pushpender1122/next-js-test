'use server'

import axios from "axios"

export const getDataFromapi=async()=>{
    const { data } = await axios.get('https://randomuser.me/api/?page=1&results=2&seed=abc');
    return data.results;
}