import { create } from 'zustand';

type AuthState = {
  auth_token?: string | null;
  setAuthToken: (auth_token: string) => void;
  clearAuthToken: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  auth_token: null,
  setAuthToken: (auth_token: string) => set({ auth_token }),
  clearAuthToken: () => set({ auth_token: null }),
}));