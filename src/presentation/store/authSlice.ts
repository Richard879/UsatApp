import { create } from 'zustand';
import { Auth } from "../../core/entities/Auth";

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  authData: Auth | null;
  loginStart: () => void;
  loginSuccess: (authData: Auth) => void;     
  loginFailure: (error: string) => void;
  logout: () => void;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  error: null,
  authData: null,
  loginStart: () => {},
  loginSuccess: () => {},       
  loginFailure: () => {},
  logout: () => {},
};

export const authSlice = create<AuthState>((set) => ({
  ...initialState,

    loginStart: () => {
        set({ loading: true, error: null });    
    },

    loginSuccess: async (authData: Auth) => {
        set({ loading: true, error: null });
        try {
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        set({ isAuthenticated: true, authData, loading: false });
        } catch (error) {
        set({ error: 'Login failed', loading: false });
        }
    },

    loginFailure: (error: string) => {
        set({ error, loading: false });
    },

    logout: () => {
        set({ isAuthenticated: false, authData: null });
    },
}));