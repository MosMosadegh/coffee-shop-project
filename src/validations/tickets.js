import { z } from "zod";

// Schema for validation

const ticketSchema = z.object({
  title: z.string().min(3).max(30),
  body: z.string().min(1).max(500),
  department: z.string().length(24),
  subDepartment: z.string().length(24),
  priority: z.number().int().min(1).max(3).default(1), 
});

// Validate function
const validateTicket = (ticketData) => {
  return ticketSchema.safeParse(ticketData);
};

export default validateTicket;
