import axios from "axios";

// create an axios instance
const instance = axios.create({
  baseURL: window.config.server, // 接口地址
  timeout: 5000 // request timeout
});

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export const createAPI = (url, method, data) => {
  let config = {};
  if (method === "get") {
    config.params = data;
  } else {
    config.data = data;
  }
  return instance({
    url,
    method,
    ...config
  });
};
