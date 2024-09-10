import { z } from "zod";

// Define Zod schema for Google OAuth2 token response
export const googleTokenResponseSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  id_token: z.string().optional(),
  scope: z.string(),
});
