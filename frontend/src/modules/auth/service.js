import axios from "axios";

const { REACT_APP_BASE_URL } = process.env;

const HTTP = axios.create({
  baseURL: REACT_APP_BASE_URL,
  withCredentials: true
});

const HTTPWithoutAuth = axios.create({
  baseURL: REACT_APP_BASE_URL,
  withCredentials: false
});

HTTP.interceptors.request.use(
  config => {
    const TOKEN = localStorage.getItem("authorization");
    if (TOKEN) {
      config.headers.Authorization = `${TOKEN}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

const getToken = () => localStorage.getItem("authorization");
const getBaseUrl = () => REACT_APP_BASE_URL;

export { HTTP, HTTPWithoutAuth, getToken, getBaseUrl };
