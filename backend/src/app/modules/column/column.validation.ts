import { z } from 'zod';

const createColumnZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    position: z.number().int('Position must be an integer'),
  }),
});

const updateColumnZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
  }),
});

export const ColumnValidation = {
  createColumnZodSchema,
  updateColumnZodSchema,
};
