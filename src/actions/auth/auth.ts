import { apiRusia } from "../../config/api/apiRusia";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.response";

const returnUserToken = ( data: AuthResponse ) => {

    const user: User = {
        userId:               data.data.userId,
        userName:             data.data.userName,
        firstName:            data.data.firstName,
        lastName:             data.data.lastName,
        password:             data.data.password
    }

    return{
        user: user,
        token: data.data.token,
        refresh_token: data.data.refresh_token
    }
}


export const authLogin = async(userName:string, password: string) => {
    try {
        const { data } = await apiRusia.post<AuthResponse>('/v2.0/User/Authenticate/',{
            userName,
            password
        });

        // console.log(data);
        return returnUserToken(data);

    } catch (error) {
        console.log(error);
        return null;
    }
};

// export const authCheckStatus = async () => {
//     try {
//         console.log("verificando");
//         const { data } = await apiRusia.post<AuthResponse>('/v2.0/User/RefreshToken/');
//         console.log(data);
//         return returnUserToken(data);
//     } catch (error) {
//         console.log(error);
//         return null;
//     }
// }