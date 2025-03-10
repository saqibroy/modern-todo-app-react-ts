import { z } from 'zod'

export const TodoSchema = z.object({
    id: z.string(),
    title: z
        .string()
        .min(1, 'Title cannot be empty') // Minimum length
        .max(100, 'Title must be less than 100 characters') // Maximum length
        .regex(/^[a-zA-Z0-9\s.,!?-]*$/, 'Title contains invalid characters') // Only allow letters, numbers, and basic punctuation
        .refine(
        (val) => val.trim() === val,
        'Title cannot have leading or trailing spaces' // No leading/trailing spaces
        )
        .refine(
        (val) => val.trim().length >= 3,
        'Title must be at least 3 characters long' // Minimum length after trimming
        ),
    completed: z.boolean(),
    createdAt: z.string().datetime().optional()
})

export const TodoCreateSchema = TodoSchema.omit({
    id: true,
    completed: true,
    createdAt: true
})

export const TodoUpdateSchema = TodoSchema.pick({
    id: true,
    completed: true
})

export const TodoDeleteSchema = TodoSchema.pick({
    id: true
})

export const ApiErrorSchema = z.object({
    message: z.string(),
    statusCode: z.number()
})

  

export type Todo = z.infer<typeof TodoSchema>
export type TodoCreateDTO = z.infer<typeof TodoCreateSchema>
export type TodoUpdateDTO = z.infer<typeof TodoUpdateSchema>
export type TodoDeleteDTO = z.infer<typeof TodoDeleteSchema>
export type ApiError = z.infer<typeof ApiErrorSchema>
export type ApiResponse<T> = {
    data: T | null;
    error: ApiError | null;
}