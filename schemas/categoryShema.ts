import z from "zod";

export const categorySchema = z.object({
  id: z.number({ message: "ID required" }).min(1, "ID must be greater than 1"),
  name: z
    .string({ message: "Category name is required" })
    .min(2, "Category name is required")
    .regex(/^.+$/u),
});

