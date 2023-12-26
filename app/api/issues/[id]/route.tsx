import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "@/app/validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the body of the request
  const body = await request.json();

  // Validate the body of the request
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Check if the issue exists
  const exitingIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!exitingIssue)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  // Update the issue in the database, return updated Issue
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}
