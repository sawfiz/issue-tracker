import authOptions from "@/app/auth/authOptions";
import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Protect API endpoint
  // const session = await getServerSession(authOptions);
  // if (!session) return NextResponse.json({}, { status: 401 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Invalid issue." }, { status: 404 });

  return NextResponse.json(issue, { status: 201 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Protect API endpoint
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // Get the body of the request
  const body = await request.json();

  // Validate the body of the request
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  // Check if the issue exists
  const exitingIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!exitingIssue)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  const { title, description, status, ownerId } = body;

  // Check if a user with ownerId exists
  if (ownerId) {
    const owner  = await prisma.user.findUnique({
      where: { id: ownerId },
    });
    if (!ownerId)
      return NextResponse.json(
        { error: "Invalid owner ID" },
        { status: 404 }
      );
  }

  // Update the issue in the database, return updated Issue
  const updatedIssue = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title,
      description,
      status,
      ownerId,
    },
  });
  return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Protect API endpoint
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // Check if the issue exists
  const existingIssue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!existingIssue)
    return NextResponse.json({ error: "Issue not found." }, { status: 404 });

  // Delete the issue
  await prisma.issue.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({});
}
