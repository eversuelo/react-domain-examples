import { z } from "zod";

export const CryptoSchema = z.object({
  code: z.string(),
  name: z.string(),
});
