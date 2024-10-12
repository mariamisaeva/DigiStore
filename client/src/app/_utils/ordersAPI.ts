import axiosClient from './axiosInstance';
import { AxiosResponse } from 'axios';

export interface StrapiResponse<T> {
  data: T;
  meta: any;
}

export interface OrderPayload {
  data: {
    username: string;
    email: string;
    products: string[];
  };
}

const createOrder = (
  data: OrderPayload,
): Promise<AxiosResponse<StrapiResponse<OrderPayload>>> =>
  axiosClient.post('/orders', data);

export { createOrder };
