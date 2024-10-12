import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import createRefresh from "react-auth-kit/createRefresh";

// import { config } from "dotenv";

// const result = config();
// if (result.error) {
//   throw result.error;
// }

console.log(import.meta.env.VITE_API_URL);

const useAuthAxios = () => {
  const header = useAuthHeader();
  const authenticated = useIsAuthenticated();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (authenticated) {
        config.headers.Authorization = header;
      }
      config.headers["Content-Type"] = "application/json";
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

const useCustomAxios = () => {
  const newAxios = useAuthAxios();
  const refresh = createRefresh({
    interval: 1000 * 60 * 60,
    refreshApiCallback: async (param) => {
      try {
        const response = await newAxios.post("/auth/token/refresh/", param);
        return {
          isSuccess: true,
          newAuthToken: response.data.access,
          newAuthTokenExpiresIn: 10,
          newRefreshTokenExpiresIn: 60,
        };
      } catch {
        return {
          isSuccess: false,
          newAuthToken: "",
          newAuthTokenType: "",
          newAuthTokenExpiresIn: 0,
          newRefreshTokenExpiresIn: 0,
        };
      }
    },
  });
  return refresh;
};

export default useAuthAxios;
export { useCustomAxios };
