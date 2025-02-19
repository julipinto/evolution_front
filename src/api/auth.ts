import { AuthSchema } from "../types/auth";
import axios from "../api/client";

export async function login(data: AuthSchema) {
  return axios.post("/auth", data);
}
