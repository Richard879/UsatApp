import axios from "axios";
import { TokenServiceImpl } from "../services/TokenServiceImpl";
import { apiUsat } from "../../config/api/apiUsat";
import { AuthRepositoryImpl } from "../repositories/AuthRepositoryImpl";

apiUsat.interceptors.request.use(async (config) => {
  const tokenService = new TokenServiceImpl();
  const token = await tokenService.getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});

apiUsat.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const tokenService = new TokenServiceImpl();
      const refreshToken = await tokenService.getRefreshToken();
      
      if (refreshToken) {
        try {
          const authRepository = new AuthRepositoryImpl();
          const newAuth = await authRepository.refreshToken(refreshToken);
          
          await tokenService.saveToken(newAuth.token);
          if (newAuth.refreshToken) {
            await tokenService.saveRefreshToken(newAuth.refreshToken);
          }
          
          originalRequest.headers.Authorization = `Bearer ${newAuth.token}`;
          return apiUsat(originalRequest);
        } catch (err) {
          await tokenService.removeToken();
          await tokenService.removeRefreshToken();
          // Redirigir a login
          return Promise.reject(err);
        }
      }
    }
    
    return Promise.reject(error);
  }
);