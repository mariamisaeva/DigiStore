import axios, { AxiosInstance } from 'axios';

const apiKey = process.env.NEXT_PUBLIC_REST_API_KEY;
// const cleanAPIkey = apiKey?.replace('Bearer', '');

const apiURL = process.env.NEXT_PUBLIC_STRAPI_API_URL + '/api'; //'http://localhost:1337/api';

const axiosClient: AxiosInstance = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

export default axiosClient;
