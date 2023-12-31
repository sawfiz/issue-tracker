// @/validationSchema.ts
import { Status } from "@prisma/client";
import { z } from "zod";

// Validation schema for getting all issues
// [ 'OPEN', 'IN_PROGRESS', 'CLOSED' ]
enum orderByValues {
  Title = 'title',
  Status = 'status',
  UpdatedAt = 'updatedAt',
}
enum sortOrders {
  Asc = 'asc',
  Desc = 'desc'
}

export const getIssuesSchema = z.object({
  status: z.nativeEnum(Status).optional().nullable(),
  orderBy: z.nativeEnum(orderByValues).optional().nullable(),
  sort: z.nativeEnum(sortOrders).optional().nullable(),
})

// Validation schema for creating issue
export const postIssueSchema = z.object({
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
  ownerId: z.string().min(1, "OwnerId is required.").optional().nullable(),
});
