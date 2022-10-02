import axios from 'axios';

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_PATH}/3/`,
});

api.defaults.headers.common.Authorization = `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`;

export { axios, api };
