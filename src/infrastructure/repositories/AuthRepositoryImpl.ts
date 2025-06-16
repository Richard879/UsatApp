import { AuthRepository } from "../../core/interfaces/repositories/authRepository";
import { Auth } from "../../core/entities/Auth";
import { login, refreshToken } from "../datasources/AuthApi";
import { toAuthEntity } from "../models/AuthModel";

export class AuthRepositoryImpl implements AuthRepository {

  async login(userName: string, password: string): Promise<Auth> {
    const auth = await login(userName, password);
    return toAuthEntity(auth);
  }

  async logout(): Promise<void> {
    // Implementación de logout
    return Promise.resolve();
  }

  async refreshToken(refreshToken: any): Promise<Auth> {
    const auth = await refreshToken(refreshToken);
    return toAuthEntity(auth);
  }
}