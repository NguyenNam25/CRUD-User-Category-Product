import z from "zod";

export const productSchema = z.object({
  id: z.number({ message: "ID required" }).min(1, "ID must be greater than 1"),
  name: z
    .string({ message: "Product name is required" })
    .min(2, "Product name is required")
    .regex(/^.+$/u),
  price: z
    .number({ message: "Price required" })
    .min(1000, "Price must be greater than 1000"),
  categoryId: z.number(),
  description: z.string(),
});

