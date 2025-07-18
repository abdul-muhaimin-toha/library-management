import { z } from 'zod';

export const borrowSchema = z.object({
   book: z.string().min(1, 'Book ID is required'),
   quantity: z.number().int().min(1, 'Quantity must be at least 1'),
   dueDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format for dueDate',
   }),
});
