import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import useSWR from "swr";
import { IProduct } from "./types";

const PUBLIC_API_KEY = process.env.EXPO_PUBLIC_API_KEY;
axios.defaults.baseURL =
  process.env.EXPO_PUBLIC_API_URL ?? "https://api.escuelajs.co/api/v1/";
axios.defaults.headers.post["Content-Type"] = "application/json";
/**
 * a wrapper around Axios.request to make API calls using the Django token
 * @param url the URL to make the request to - only the path eg ('/invoices'), not the full URL
 * @param method the HTTP method to use
 */
export const request = <T>(
  url: string,
  method: Method,
  config?: Partial<AxiosRequestConfig>
): Promise<AxiosResponse<T>> => {
  // const headers = { Authorization: `X-Authorization ${PUBLIC_API_KEY}` };

  return axios.request<T>({
    url,
    method,
    headers: {},
    ...config,
  });
};
export const fetchProductDetail = (productId: number) => {
  return request<IProduct>(`/products/${productId}`, "GET");
};

// swr API Hooks
export const useProductList = (offset: number, limit: number) => {
  return useSWR<IProduct[]>(`/products/?offset=${offset}&limit=${limit}`);
};
