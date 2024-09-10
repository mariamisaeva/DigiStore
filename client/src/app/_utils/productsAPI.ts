import axiosClient from './axiosInstance';
import { AxiosResponse } from 'axios';

export interface Product {
  id: number;
  attributes: {
    title: string;
    description: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
    price: number;
    files: string[];
    content: string;
    delivery: boolean;
    category: string;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

const getLatestProducts = (): Promise<
  AxiosResponse<StrapiResponse<Product[]>>
> => {
  return axiosClient.get('/products?populate=*');
};

const getProductById = (id: Number) => {
  return axiosClient.get(`/products/${id}?populate=*`);
};

export { getLatestProducts, getProductById };
