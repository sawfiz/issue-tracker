import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { issueSchema } from "../../validationSchemas";

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
