import { z } from "zod";

export const skinFoldShape = z.object({
  triceps: z.number(),
  biceps: z.number(),
  abdominal: z.number(),
  subscapular: z.number(),
  suprailiac: z.number(),
  middle_axillary: z.number(),
  calf: z.number(),
  weight: z.number().min(1),
  measured_by: z.string(),
  measured_at: z.date(),
});

export type SkinFoldSchema = z.infer<typeof skinFoldShape>;
