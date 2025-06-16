import { Auth } from "../../core/entities/Auth";

export interface AuthModel {
    data:      AuthReponse;
    isSuccess: boolean;
    message:   string;
    errors:    any[];
}

export interface AuthReponse {
  accessToken: string;
  refreshToken?: string;
  //user: {
    id: number;
    login: string;
    nombreCompleto: string;
  //};
}

export const toAuthEntity = (model: AuthModel): Auth => ({
  token: model.data.accessToken,
  refreshToken: model.data.refreshToken,
  user: {
    id: model.data.id,
    login: model.data.login,
    name: model.data.nombreCompleto,
  },
});