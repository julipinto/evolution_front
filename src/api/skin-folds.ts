import { SkinFoldSchema } from "../types/skin-folds-type";
import axios from "./client";

export async function getFolds() {
  // return axios.get("/measurements/skin_folds");
  const response = await axios.get("/measurements/skin_folds");
  return response.data;
}

export async function postFolds(data: SkinFoldSchema) {
  return axios.post("/measurements/skin_folds", data);
}
