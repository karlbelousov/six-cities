import axios, { AxiosInstance, AxiosRequestConfig} from 'axios';
import { getToken } from './token';
const BASE_URL = 'https://10.react.htmlacademy.pro/six-cities';
const TIMEOT = 5000;

export function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: TIMEOT
  });

  api.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
}
