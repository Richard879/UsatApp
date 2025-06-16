import { apiUsat } from "../../config/api/apiUsat";
import { AuthModel } from "../models/AuthModel";

export const login = async (login: string, password: string): Promise<AuthModel> => {

  const response = await apiUsat.post('/AuthPersonal/Login/', { 
      login, 
      password 
    });

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Server responded with status ${response.status}`);
    }

}

export const refreshToken = async (refreshToken: string): Promise<AuthModel> => {
  const response = await apiUsat.post('/AuthPersonal/RefreshToken/', { refreshToken });
  return response.data;
}