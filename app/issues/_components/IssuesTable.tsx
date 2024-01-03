import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { TableLabel, IssueQuery } from "./TableLabel";

import { Table } from "@radix-ui/themes";
import Link from "next/link";

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Updated", value: "updatedAt", className: "hidden md:table-cell" },
];
const columnValues: string[] = columns.map((column) => column.value);
export { columnValues };

interface IssuesTableProps {
  searchParams: IssueQuery;
  issues: Issue[];
}

export default function IssuesTable({
  searchParams,
  issues,
}: IssuesTableProps) {
  
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col.value} className={col.className}>
              <TableLabel searchParams={searchParams} col={col} />
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
