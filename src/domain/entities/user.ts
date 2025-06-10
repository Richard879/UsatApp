export interface AuthUser {
    data:      User;
    isSuccess: boolean;
    message:   string;
    errors:    any[];
}

export interface User {
    userId:               number;
    userName:             string;
    password:             string;
    firstName:            string;
    lastName:             string;
}
