import { Auth } from '../../entities/Auth';

export interface AuthRepository {
  login(email: string, password: string): Promise<Auth>;
  logout(): Promise<void>;
  refreshToken(refreshToken: string): Promise<Auth>;
}