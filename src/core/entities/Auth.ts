export interface Auth {
  token: string;
  refreshToken?: string;
  user: {
    id: number;
    login: string;
    name: string;
  };
}