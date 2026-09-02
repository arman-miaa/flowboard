import { z } from 'zod';

const createBoardZodSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Board name is required'),
    description: z.string().optional(),
  }),
});

const updateBoardZodSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
  }),
});

const shareBoardZodSchema = z.object({
  body: z.object({
    email: z.string().email('Valid email required'),
    role: z.enum(['VIEWER', 'EDITOR']),
  }),
});

export const BoardValidation = {
  createBoardZodSchema,
  updateBoardZodSchema,
  shareBoardZodSchema,
};
