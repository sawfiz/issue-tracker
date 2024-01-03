import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { postIssueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import { Issue, Status } from "@prisma/client";
import { getIssuesSchema } from "../../validationSchemas";

export async function GET(request: NextRequest) {
  console.log("Getting issues")
  // Extract search parameters
  console.log(request.nextUrl)
  const searchParams = request.nextUrl.searchParams;
  console.log("🚀 ~ file: route.ts:12 ~ GET ~ searchParams:", searchParams);
  
    const { status, orderBy, sort, page, pageSize } = {
      status: searchParams.get("status"),
      orderBy: searchParams.get("orderBy"),
      sort: searchParams.get("sort"),
      page: searchParams.get("page"),
      pageSize: searchParams.get("pageSize"),
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
      // Get the total number of issue of a give status
      const count = await prisma.issue.count({ where });

      const issues = await prisma.issue.findMany({
        where,
        orderBy: orderByParam,
        skip: page ? parseInt(pageSize!) * (parseInt(page) - 1) : 0,
        take: pageSize ? parseInt(pageSize!) : 10,
      });
      console.log("🚀 ~ file: route.ts:52 ~ GET ~ issues:", issues)
      return NextResponse.json({ issues, count }, { status: 200 });
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
