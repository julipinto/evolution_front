import { Navigate, Outlet } from "react-router";
import { useAuthStore } from "../store/auth-store";

export default function PrivateRoutes() { 
  const { auth_token } = useAuthStore((state) => state)

  if (!auth_token) {
    return <Navigate to="/auth" />
  }

  return <Outlet/>
}