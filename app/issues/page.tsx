import prisma from "@/prisma/client";
import { IssueToolBar } from "@/app/components";
import { Issue, Prisma, Status } from "@prisma/client";
import Pagination from "../components/Pagination";
import IssuesTable, {
  columnValues,
} from "./_components/IssuesTable";
import {  IssueQuery } from "./_components/TableLabel";

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

  const count = parseInt(searchParams.page) || 1;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
  })

  return (
    <div>
      <IssueToolBar />
      <IssuesTable searchParams={searchParams} issues={issues} />
      <Pagination
        currentPage={searchParams.page ? parseInt(searchParams.page) : 1}
        totalItems={count}
        pageSize={pageSize}
      />
    </div>
  );
};

export default IssuesPage;
