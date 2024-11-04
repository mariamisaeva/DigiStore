import axiosClient from './axiosInstance';
import { AxiosResponse } from 'axios';

export interface CartItem {
  id: number;
  attributes: {
    //   username: string;
    //   email: string;
    products: {
      data: any[];
    };
  };
}

export interface cartPayload {
  data: {
    username: string;
    email: string;
    products: number[]; //string or number
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
//  api/carts?populate[products][populate]=image&filters[email][$eq]=emailParam

const getCartPerUser = (
  email: string,
): Promise<AxiosResponse<StrapiResponse<CartItem[]>>> => {
  return axiosClient.get(
    `/carts?populate[products][populate]=image&filters[email][$eq]=${email}`,
  );
};

const deleteCartItem = (id: any) => {
  return axiosClient.delete(`/carts/${id}`);
};

export { addToCart, getCartPerUser, deleteCartItem };
