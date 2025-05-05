import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const KEY_TOKEN = "KEY_TOKEN";
export const REFRESH_TOKEN = "REFRESH_TOKEN";
export const KEY_USER = "KEY_USER";

const parseToken = (token: string) => {
  return `Bearer ${token}`;
};

class HttpService {
  axios: AxiosInstance;

  constructor() {
    this.axios = axios.create();
    this.axios.defaults.withCredentials = false;

    //! Interceptor request
    this.axios.interceptors.request.use(
      function (config) {
        config.headers["x-api-key"] = import.meta.env.VITE_API_KEY;
        console.log("config", config);

        const token = localStorage?.getItem(KEY_TOKEN) || "";
        if (token) {
          config.headers["Authorization"] = parseToken(token);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    //! Interceptor response
    this.axios.interceptors.response.use(
      function (config) {
        const statusCode = config.data?.data?.status;
        if (statusCode >= 400 && statusCode <= 499) {
          return Promise.reject(config?.data?.data?.message);
        }
        return config;
      },
      function (error) {
        const urlReq = error.response.config.url;
        const isLoginUrl = urlReq.includes("login/");
        if (error.response.status === 401 && !isLoginUrl) {
          localStorage.removeItem(KEY_TOKEN);
          window.location.reload();
          return;
        }
        return Promise.reject(error);
      },
    );
  }
  attachTokenToHeader(token: string) {
    this.axios.interceptors.request.use(
      function (config) {
        if (token) {
          config.headers["Authorization"] = parseToken(token);
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      },
    );
  }
  saveTokenToLocalStorage(token: string) {
    localStorage?.setItem(KEY_TOKEN, token);
  }
  saveRefreshTokenToLocalStorage(refreshToken: string) {
    localStorage?.setItem(REFRESH_TOKEN, refreshToken);
  }
  saveUserToStorage(user: any) {
    localStorage?.setItem(KEY_USER, JSON.stringify(user));
  }

  getTokenFromLocalStorage() {
    const token = localStorage?.getItem(KEY_TOKEN);
    return token;
  }
  getUserFromLocalStorage() {
    const user = localStorage?.getItem(KEY_USER);
    return user ? JSON.parse(user) : undefined;
  }
  clearUserInfo() {
    localStorage?.removeItem(KEY_TOKEN);
    localStorage?.removeItem(KEY_USER);
  }

  get(url: string, config?: AxiosRequestConfig) {
    return this.axios.get(url, config);
  }

  post(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.post(url, data, config);
  }

  delete(url: string, config?: AxiosRequestConfig) {
    return this.axios.delete(url, config);
  }

  put(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.put(url, data, config);
  }

  patch(url: string, data: any, config?: AxiosRequestConfig) {
    return this.axios.patch(url, data, config);
  }
}

const httpService = new HttpService();
export default httpService;
