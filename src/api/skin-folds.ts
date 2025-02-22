import { SkinFoldSchema } from "../types/skin-folds-type";
import axios from "./client";

export type ComparableProp = {
  current: number;
  last_diff: number;
};

export type RequestSkinFolds = {
  id: number;
  measured_at: string;
  measured_by: string;
  measurements: {
    abdomnal: ComparableProp;
    biceps: ComparableProp;
    calf: ComparableProp;
    middle_axillary: ComparableProp;
    subscapular: ComparableProp;
    suprailiac: ComparableProp;
    thigh: ComparableProp;
    triceps: ComparableProp;
  };
  stats: {
    body_density: ComparableProp;
    fat_classification: string;
    fat_mass: ComparableProp;
    fat_percentage: ComparableProp;
    fold_sum: ComparableProp;
    lean_mass: ComparableProp;
    residual_mass: ComparableProp;
    weight: ComparableProp;
  };
};

export async function getFolds() {
  const response = await axios.get<{ skin_folds: RequestSkinFolds[] }>(
    "/measurements/skin_folds"
  );
  return response.data;
}

export async function postFolds(data: SkinFoldSchema) {
  return axios.post("/measurements/skin_folds", data);
}
