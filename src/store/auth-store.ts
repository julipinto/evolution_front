import { create } from "zustand";
import history from "../utils/history";
import axios from "../api/client";
import { isValidToken } from "../utils/validate-auth-token";

type AuthState = {
  authToken: string | null;
  login: (authToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => {
  const authToken = sessionStorage.getItem("auth_token") || null;

  if (authToken && isValidToken(authToken)) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
  } else {
    sessionStorage.removeItem("auth_token");
    history.push("/auth");
  }

  return {
    authToken,
    login: (authToken: string) => {
      sessionStorage.setItem("auth_token", authToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
      set({ authToken });
    },
    logout: () => {
      sessionStorage.removeItem("auth_token");
      delete axios.defaults.headers.common["Authorization"];
      set({ authToken: null });
      history.push("/auth");
    },
  };
});
