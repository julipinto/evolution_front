import { AuthSchema } from "../types/auth";
import axios from "./client";

export async function login(data: AuthSchema) {
  return axios.post("/auth", data);
}
