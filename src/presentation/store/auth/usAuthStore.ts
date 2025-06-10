import { create } from 'zustand';
import { User } from '../../../domain/entities/user';
import { AuthStatus } from '../../../infrastructure/interfaces/auth.status';
import { authLogin } from '../../../actions/auth/auth';
import { StorageAdapter } from '../../../config/adapters/storage-adapter';

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;
    login: (userName: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()( (set, get ) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async(userName: string, password: string) => {
        const resp = await authLogin(userName, password);
        // console.log({resp});
        if( !resp ) {
            set({ status: 'unauthenticated', token: undefined, user: undefined})
            return false;
        }

        await StorageAdapter.setItem('accessToken', resp.token);
        await StorageAdapter.setItem('refreshToken', resp.refresh_token);
        const storeToken = await StorageAdapter.getItem('accessToken');
        // console.log("token inicial: " + storeToken);
        set({ status: 'authenticated', token: resp.token, user: resp.user })
        return true;
    },

    checkStatus: async() => {
        // const resp = await authCheckStatus();

        // if( !resp ) {
        //     set({ status: 'unauthenticated', token: undefined, user: undefined})
        //     return;
        // }

        // await StorageAdapter.setItem('accessToken', resp.token);
        // await StorageAdapter.setItem('refreshToken', resp.refresh_token);
        const storeToken = await StorageAdapter.getItem('accessToken');
        if(storeToken !== null || storeToken === undefined){
            set({ status: 'authenticated', token: storeToken, user: undefined })
        }else{
            set({ status: 'unauthenticated', token: undefined, user: undefined})
        }
    },

    logout: async() => {
        await StorageAdapter.removeItem('accessToken');
        await StorageAdapter.removeItem('refreshToken');
        set({ status: 'unauthenticated', token: undefined, user: undefined})
    }
}))