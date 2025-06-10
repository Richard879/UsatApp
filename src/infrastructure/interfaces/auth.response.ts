export interface AuthResponse {
    data:      UserAuthResponse;
    isSuccess: boolean;
    message:   string;
    errors:    any[];
}

export interface UserAuthResponse {
    userId:               number;
    userName:             string;
    password:             string;
    firstName:            string;
    lastName:             string;
    token:                string;
    inactivityExpiration: string;
    refresh_token:        string;
}
