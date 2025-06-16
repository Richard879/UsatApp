import { TokenService } from "../../core/interfaces/services/tokenService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class TokenServiceImpl implements TokenService {
  private readonly TOKEN_KEY = "auth_token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";

  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(this.TOKEN_KEY, token);
  }

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.TOKEN_KEY);
  }

  async removeToken(): Promise<void> {
    await AsyncStorage.removeItem(this.TOKEN_KEY);
  }

  async saveRefreshToken(token: string): Promise<void> {
    await AsyncStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return AsyncStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  async removeRefreshToken(): Promise<void> {
    return AsyncStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }
}