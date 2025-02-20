import axios from "./client";

export function getMe() {
  return axios.get("/me");
}
