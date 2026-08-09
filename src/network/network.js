import axios from 'axios';

const conn = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Origin': import.meta.env.VITE_APP_ORIGIN_URL,
    },
});



export { conn };