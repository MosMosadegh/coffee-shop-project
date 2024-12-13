import { z } from "zod";

// Schema for validation

const userSchema = z.object({
  name: z.string().min(3).max(30),
  phone: z
    .string()
    .regex(/^[0-9]+$/) 
    .min(10)
    .max(15),
  email: z.string().email().optional(),
});

// Validate function
const validateUser = (userData) => {
  return userSchema.safeParse(userData);
};

export default validateUser;
