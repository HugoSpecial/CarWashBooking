import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  photo: z.string().url().optional(),
});

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  photo: z.string().url().optional(),
});

export const updatePasswordSchema = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
});

export const requestResetPasswordSchema = z.object({
  email: z.string().email('Valid email is required.'),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required.'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters.'),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UpdatePasswordDTO = z.infer<typeof updatePasswordSchema>;
export type RequestResetPasswordDTO = z.infer<
  typeof requestResetPasswordSchema
>;
export type ResetPasswordDTO = z.infer<typeof resetPasswordSchema>;
