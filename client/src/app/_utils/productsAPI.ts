import axiosClient from './axiosInstance';
import { AxiosResponse } from 'axios';
import { unstable_cache } from 'next/cache';

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

const getLatestProducts = unstable_cache(
  async (): Promise<AxiosResponse<StrapiResponse<Product[]>>> => {
    return axiosClient.get(
      '/products?fields[0]=title&fields[1]=price&fields[2]=category&populate[image][fields][0]=url',
    );
  },
  ['latest-products'],
  { revalidate: 60 },
);

const getProductById = unstable_cache(
  async (
    id: number,
  ): Promise<AxiosResponse<StrapiResponse<Product>>> => {
    return axiosClient.get(`/products/${id}?populate=*`);
  },
  (id: number) => ['product-by-id', id],
  { revalidate: 60 },
);

const getProductByCategory = unstable_cache(
  async (
    category: string,
  ): Promise<AxiosResponse<StrapiResponse<Product[]>>> => {
    return axiosClient.get(
      `/products?filters[category][$eq]=${category}&populate=*`,
    );
  },
  (category: string) => ['products-category', category],
  { revalidate: 60 },
);

export { getLatestProducts, getProductById, getProductByCategory };
