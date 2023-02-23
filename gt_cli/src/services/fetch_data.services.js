import axios from "axios";
import { api_envs } from "../configs/envs.configs";
const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default async function fetchData(method, url, data) {
  const response = await instance({
    method,
    url: `${api_envs.base_url}/${api_envs.base_path}/${url}`,
    ...(data && { data }),
  });
  if (response.status === 200 || response.status === 201) {
    return {
      status: response.status,
      isValid: true,
      data: response?.data || {},
    };
  }
  return {
    isValid: false,
    status: response.status,
  };
}

instance.interceptors.request.use((request) => {
  const auth = sessionStorage.getItem("_sn");
  if (auth) {
    request.headers.Authorization = `Bearer ${auth}`;
  }
  return request;
});
