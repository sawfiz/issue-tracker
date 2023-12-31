"use client";
import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowDownIcon, ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Updated", value: "updatedAt", className: "hidden md:table-cell" },
];

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  sort: "asc" | "desc";
  page: string;
}

interface IssuesTableProps {
  searchParams: IssueQuery;
  issues: Issue[];
}

export default function IssuesTable({
  searchParams,
  issues,
}: IssuesTableProps) {
  const router = useRouter();
  const [sortOrder, setSortOrder] = useState("asc");
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col.value} className={col.className}>
              <button
                onClick={() => {
                  const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
                  setSortOrder(newSortOrder);

                  const params = new URLSearchParams();
                  if (searchParams.status)
                    params.append("status", searchParams.status);
                  params.append("orderBy", col.value);
                  params.append("sort", sortOrder);
                  const query = params.toString();

                  router.push("/issues?" + query);
                }}
              >
                {col.label}
              </button>
              {/* Show an indicator if a column header is clicked */}
              {col.value === searchParams.orderBy &&
                (sortOrder === "asc" ? (
                  <ArrowDownIcon className="inline" />
                ) : (
                  <ArrowUpIcon className="inline" />
                ))}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.RowHeaderCell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.RowHeaderCell>
            <Table.Cell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {new Date(issue.updatedAt).toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

