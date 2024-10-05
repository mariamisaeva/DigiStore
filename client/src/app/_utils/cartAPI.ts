import axiosClient from './axiosInstance';

const addToCart = (data: any) => axiosClient.post('/cart', data);

export default addToCart;
