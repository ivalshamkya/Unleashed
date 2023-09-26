import AxiosInstances from "axios";
import { getCookieValue } from "../utils/cookiesUtils";

const axios = AxiosInstances.create({
  baseURL: "http://localhost:3000/api"
});

axios.interceptors.request.use((config) => {
  const token = getCookieValue("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AUTH_PREFIX = "/auth";
export const SECTION_PREFIX = "mentors/section";

export default axios;
