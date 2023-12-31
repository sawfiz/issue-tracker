import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { postIssueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Issue, Status } from "@prisma/client";
import { getIssuesSchema } from "../../validationSchemas";

export async function GET(request: NextRequest) {
  // Extract search parameters
  const searchParams = request.nextUrl.searchParams;

  const { status, orderBy, sort } = {
    status: searchParams.get('status'),
    orderBy: searchParams.get('orderBy'),
    sort: searchParams.get('sort'),
  };
  
  // Valid status
  const validation = getIssuesSchema.safeParse({
    status,
    orderBy,
    sort,
  });

  if (!validation.success)
    return NextResponse.json(
      { error: "Invalid key for sorting." },
      { status: 404 }
    );

  // Validate and handle null or undefined values for status and orderBy
  // Only add status condition if it exists
  const where = status ? { status } : {};
  // Only add orderBy if it exists
  const orderByParam = orderBy ? { [orderBy]: sort } : undefined;

  try {
    const issues = await prisma.issue.findMany({
      where,
      orderBy: orderByParam,
    });
    return NextResponse.json(issues, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  // Protect API endpoint
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // Get the body of the request
  const body = await request.json();

  // Validate the body of the request
  const validation = postIssueSchema.safeParse(body);

  // If validation errors, return errors
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const { title, description } = body;
  // Create a new Issue in the database, return newIssue
  const newIssue = await prisma.issue.create({
    data: {
      title,
      description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
