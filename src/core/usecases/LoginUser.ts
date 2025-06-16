import { AuthRepository } from "../interfaces/repositories/authRepository";
import { Auth } from "../entities/Auth";

export class LoginUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(userName: string, password: string): Promise<Auth> {
    if (!userName || !password) {
      throw new Error("Email and password are required");
    }
    return this.authRepository.login(userName, password);
  }
}