import { Outlet, useNavigate } from "react-router";
import { useAuthStore } from "../store/auth-store";
import { useUserStore } from "../store/user-store";
import { getMe } from "../api/me";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function PrivateRoutes() { 
  const { authToken } = useAuthStore((state) => state);
  const { setUser } = useUserStore((state) => state);

  const navigate = useNavigate();

  const { data, isError } = useQuery({
    queryKey: ['me'], // Chave única para a query
    queryFn: getMe, // Função que faz a requisição
    retry: 1, // Número de tentativas em caso de erro
    enabled: !!authToken, // Se a query deve ser executada
    // staleTime: 1000 * 60 * 5, // Tempo em que os dados são considerados "frescos" (5 minutos)
  });

  useEffect(() => {
    if (data) {
      setUser(data); // Armazena os dados do usuário no Zustand
    }
  }, [data, setUser]);

  useEffect(() => {
    if (isError) {
      navigate('/auth'); // Redireciona para a rota /auth
    }
  }, [isError, navigate]);


  return <Outlet/>
}