import prisma from "@/prisma/client";
import { IssueToolBar } from "@/app/components";
import { Issue, Prisma, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssuesTable, {
  columnValues,
} from "./_components/IssuesTable";
import {  IssueQuery } from "./_components/TableLabel";
import { Metadata } from "next";

const pageSize = 10;

const IssuesPage = async ({ searchParams }: { searchParams: IssueQuery }) => {
  // Create the {where} object to be used by prisma
  // Primas find ignores a search parameter is it if undefined
  const statusValues = Object.values(Status);
  const status = statusValues.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = { status };

  // Create the {orderBy} object to be used by prisma
  // [] is used to get the value of searchParams.orderBy
  const orderBy = columnValues.includes(searchParams.orderBy)
  ? {[searchParams.orderBy]: searchParams.sort}
  : undefined;

  const page = parseInt(searchParams.page) || 1;

  // Fetch 1 page of issues based on status and sort
  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  })

  // Get the number of issues based on status
  const issuesCount = await prisma.issue.count({where})

  return (
    <div>
      <IssueToolBar />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
        totalItems={issuesCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "Issues list that can be filtered and sorted."
}