import axios, { AxiosRequestConfig } from "axios";
import TokenHandling from "./tokenHandling";
import { config } from "../config/constants";
import AuthService from "./auth.service";

const HTTPClient = axios.create({
  baseURL: config.url.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

//adds bearer to header request
HTTPClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = TokenHandling.getLocalAccessToken();
    if (config.headers === undefined) {
        config.headers = {};
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//checks if accestoken was expired and refreshtoken is available
HTTPClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (originalConfig.url !== "/auth/login" && err.response) {
      // Access Token was expired   
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const refreshToken = TokenHandling.getLocalRefreshToken();
          const rs = await HTTPClient.post("/auth/refreshtoken", {refreshToken: `${refreshToken}`});
          const jwt_token  = rs.data.jwt_token;
          TokenHandling.updateLocalAccessToken(jwt_token);
          return HTTPClient(originalConfig);
        } catch (_error) {
          AuthService.logout();
          window.location.href = "/login"
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(err);
  }
);
export default HTTPClient;
