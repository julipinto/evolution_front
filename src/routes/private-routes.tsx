import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth-store";
import { useEffect } from "react";

export default function PrivateRoutes() { 
  const { authToken } = useAuthStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) navigate("/auth");
  }, [authToken, navigate])

  return <Outlet/>
}