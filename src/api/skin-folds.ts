import { SkinFoldSchema } from "../types/skin-folds-type";
import axios from "./client";

export function getFolds() {
  return axios.get("/measurements/skin_folds");
}

export function postFolds(data: SkinFoldSchema) {
  return axios.post("/measurements/skin_folds", data);
}
