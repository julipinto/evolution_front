import { z } from "zod";

const toNumber = (value: unknown) => {
  if (typeof value === "string") {
    if (value.trim() === "") {
      return undefined; // Retorna undefined para strings vazias
    }
    return parseFloat(value.replace(',', '.')); // Converte vírgula para ponto
  }
  return value;
};

export const skinFoldShape = z.object({
  triceps: z.preprocess(toNumber, z.number().optional()), // Dobra tricípital (opcional)
  biceps: z.preprocess(toNumber, z.number().optional()), // Dobra bicipital (opcional)
  abdominal: z.preprocess(toNumber, z.number().optional()), // Dobra abdominal (opcional)
  subscapular: z.preprocess(toNumber, z.number().optional()), // Dobra subescapular (opcional)
  thigh: z.preprocess(toNumber, z.number().optional()),
  suprailiac: z.preprocess(toNumber, z.number().optional()), // Dobra supra-ilíaca (opcional)
  middle_axillary: z.preprocess(toNumber, z.number().optional()), // Dobra axilar média (opcional)
  calf: z.preprocess(toNumber, z.number().optional()), // Dobra da panturrilha (opcional)
  weight: z.preprocess(toNumber, z.number().min(1, { message: "O peso deve ser maior que 0" })), // Peso (obrigatório)
  measured_by: z.string().min(1, { message: "O nome do profissional é obrigatório" }), // Profissional (obrigatório)
  measured_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "A data deve estar no formato yyyy-mm-dd (ex: 2023-11-10)",
  }), // Data no formato yyyy-mm-dd (obrigatória)
});

export type SkinFoldSchema = z.infer<typeof skinFoldShape>;
