import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { POSTissueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
  // Protect API endpoint
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({}, {status: 401})

  // Get the body of the request
  const body = await request.json();

  // Validate the body of the request
  const validation = POSTissueSchema.safeParse(body);

  // If validation errors, return errors
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const {title, description} = body;
  // Create a new Issue in the database, return newIssue
  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
