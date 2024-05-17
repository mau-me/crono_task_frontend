// utils/api.ts
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://crono-task-35306e24b306.herokuapp.com/',
});

export default api;
