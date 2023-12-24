import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Set up validation schema
const issueSchema = z.object({
  title: z.string().min(1, "Title is required.").max(255),
  description: z.string().min(1, "Description is required.").max(65535),
});

export async function POST(request: NextRequest) {
  // Get the body of the request
  const body = await request.json();

  // Validate the body of the request
  const validation = issueSchema.safeParse(body);

  // If validation errors, return errors
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Create a new Issue in the database, return newIssue
  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
