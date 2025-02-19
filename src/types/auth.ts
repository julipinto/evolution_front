import { z } from "zod";

export const authShape = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type AuthSchema = z.infer<typeof authShape>;
