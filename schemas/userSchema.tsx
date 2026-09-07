import z from "zod";

export const userSchema = z.object({
  id: z.number({ message: "ID required" }).min(1, "ID must be greater than 1"),
  fullname: z
    .string({ message: "Full Name is required" })
    .min(1, "Full name is required")
    .regex(/^[\p{L}\s]+$/u, "Full name can only contain letters and spaces"),
  email: z
    .string({ message: "Email is required" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "This is not email"),
  password: z
    .string({ message: "Password is required" })
    .min(6, "Password must contain at least 6 characters")
    .regex(/[A-Za-z]/, "Password must contain at least 1 character (a-z)"),
});

