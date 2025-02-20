import { useCallback, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth-store";
import { useUserStore } from "../store/user-store";
import { getMe } from "../api/me";

export default function PrivateRoutes() { 
  const { authToken } = useAuthStore((state) => state);
  const userStore = useUserStore((state) => state);

  const navigate = useNavigate();

  const fetchMe = useCallback(() => {
    return getMe().then((response) => {
      userStore.setUser(response.data);
    })
  }, [userStore])

  useEffect(() => {
    if (!authToken) {
      navigate("/auth");
      return;
    }

    fetchMe()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken, navigate])

  return <Outlet/>
}