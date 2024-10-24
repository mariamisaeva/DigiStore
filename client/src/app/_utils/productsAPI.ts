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
  return axiosClient.get(
    '/products?fields[0]=title&fields[1]=price&populate[image][fields][0]=url',
  );
};

const getProductById = (id: number) => {
  return axiosClient.get(`/products/${id}?populate=*`);
};

const getProductByCategory = (category: string) => {
  return axiosClient.get(
    `/products?filters[category][$eq]=${category}&populate=*`,
  );
};

export { getLatestProducts, getProductById, getProductByCategory };
