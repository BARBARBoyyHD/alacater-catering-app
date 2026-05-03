import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().min(6, { message: 'Passwords must match' }),
  businessName: z.string().min(3, { message: 'Business name must be at least 3 characters' }),
  // role is set in metadata, not directly in form for signup
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'], // Set the error path to the confirmPassword field
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
})
