import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(128)
});

export const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(128)
});

const currentYear = new Date().getFullYear();
export const vehicleSchema = z.object({
  make: z.string().trim().min(1).max(80),
  model: z.string().trim().min(1).max(80),
  year: z.number().int().min(1886).max(currentYear + 1),
  price: z.number().finite().positive(),
  quantity: z.number().int().min(0),
  imageUrl: z.string().trim().max(2048).optional().default(""),
  description: z.string().trim().max(2000).optional().default("")
});

export const vehicleUpdateSchema = vehicleSchema.partial();