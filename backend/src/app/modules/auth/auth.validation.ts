import { z } from 'zod';

const registerZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }),
});

const updateProfileZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
});

const changePasswordZodSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(6, 'New password must be at least 6 characters'),
  }),
});

export const AuthValidation = {
  registerZodSchema,
  loginZodSchema,
  updateProfileZodSchema,
  changePasswordZodSchema,
};
