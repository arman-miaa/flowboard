import { z } from 'zod';

const createTaskZodSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    position: z.number().int(),
    description: z.string().optional(),
  }),
});

const updateTaskZodSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    description: z.string().optional(),
  }),
});

const moveTaskZodSchema = z.object({
  body: z.object({
    columnId: z.string().min(1, 'Column ID required'),
    position: z.number().int(),
  }),
});

export const TaskValidation = {
  createTaskZodSchema,
  updateTaskZodSchema,
  moveTaskZodSchema,
};
