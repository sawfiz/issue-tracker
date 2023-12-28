// @/validationSchema.ts
import { z } from "zod";

// Validation schema for creating issue
export const POSTissueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
});

// Validation schema for patching issue
// All fields are optional
export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required.")
    .max(65535)
    .optional(),
  status: z.string().min(1, "Status is required.").optional(),
  ownerId: z
    .string()
    .min(1, "OwnerId is required.")
    .optional()
    .nullable(),
});
