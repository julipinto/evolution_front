import axios from "./client";

export async function getMe() {
  const response = await axios.get("/me");
  return response.data;
}
