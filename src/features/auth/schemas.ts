import { z } from "zod";

export const UpdateMeSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
  imageFile: z.any().optional(),
  imageDelete: z.enum(["true","false"]).optional(),
  password: z.string().min(1).optional(),
});
export type UpdateMeInput = z.infer<typeof UpdateMeSchema>;

export const UpdateUserSchema = UpdateMeSchema.extend({ roleId: z.string().optional() });
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

export const UpdateRoleSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().max(255).optional(),
  permissions: z.array(z.string()).optional(),
});
export type UpdateRoleInput = z.infer<typeof UpdateRoleSchema>;
