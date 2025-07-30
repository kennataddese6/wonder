import * as z from "zod/v4"

export const Lead = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .refine((val) => /\S+@\S+\.\S+/.test(val), {
      message: "Invalid email address",
    }),
  description: z.string().min(1, "Description is required").max(255, "Description must be 255 characters or less"),
})
