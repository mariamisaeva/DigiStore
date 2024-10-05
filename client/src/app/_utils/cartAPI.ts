import axiosClient from './axiosInstance';

const addToCart = (data: any) => {
  console.log('Sending to cart...');
  return axiosClient.post('/cart', data);
};

const cartAPI = {
  addToCart,
};

export default cartAPI;
