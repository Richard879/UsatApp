import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from "@env";
import axios from "axios";
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL = 
        (STAGE === 'prod')
        ? PROD_URL
        : Platform.OS === 'ios'
            ? API_URL_IOS
            : API_URL_ANDROID;

const apiRusia = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

//TODO: Interceptores
apiRusia.interceptors.request.use(
    async (config) => {
        const token = await StorageAdapter.getItem('accessToken');
        // console.log(token);
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    }
);

apiRusia.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = await StorageAdapter.getItem('refreshToken');
        if (refreshToken) {
          try {
            const response = await apiRusia.post(`/v2.0/User/Authenticate/refreshToken`, {refreshToken});
            // don't use axious instance that already configured for refresh token api call
            console.log("refresh " + response);
            const newAccessToken = response.data.token;
            await StorageAdapter.setItem('accessToken', newAccessToken);  //set new access token
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originalRequest); //recall Api with new token
          } catch (error) {
            // Handle token refresh failure
            // mostly logout the user and re-authenticate by login again
          }
        }
      }
      return Promise.reject(error);
    }
  );

export {
    apiRusia
}