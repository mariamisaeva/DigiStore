import axiosClient from './axiosInstance';
import { AxiosResponse } from 'axios';

export interface cartPayload {
  data: {
    username: string;
    email: string;
    product: number[]; //string or number
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

const addToCart = (
  payload: cartPayload,
): Promise<AxiosResponse<StrapiResponse<cartPayload>>> => {
  return axiosClient.post('/carts', payload);
};

// const addToCart = (payload: Request) => {
//   console.log('Sending to cart...');
//   console.log('The data in cartAPI: ', payload);
//   return axiosClient.post('/carts', payload);
// };

// const addToCart = async (payload: any) => {
//   try {
//     console.log('Sending POST request to /cart with data:', payload);
//     const response = await axiosClient.post('/carts', payload);
//     console.log('Response:', response);
//   } catch (err: any) {
//     //I have an error here WHY?
//     if (err.response) {
//       console.error('Server responded with an error:', err.response.data);
//       console.error('Status code:', err.response.status);
//       console.error('Headers:', err.response.headers);

//       // Log the error object for deeper investigation
//       if (err.response.data && err.response.data.error) {
//         console.error('Error details:', err.response.data.error);
//       }
//     } else if (err.request) {
//       // If no response was received from the server
//       console.error('No response received:', err.request);
//     } else {
//       // If an error occurred while setting up the request
//       console.error('Error setting up request:', err.message);
//     }

//     throw err;
//   }
// };

export { addToCart };