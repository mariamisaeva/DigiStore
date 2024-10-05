import axiosClient from './axiosInstance';

const addToCart = (data: any) => axiosClient.post('/cart', data);

const cartAPI = {
  addToCart,
};

export default cartAPI;
