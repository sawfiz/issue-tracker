"use client";
import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Updated", value: "updatedAt", className: "hidden md:table-cell" },
];

interface IssuesTableProps {
  orderBy: keyof Issue | undefined;
  issues: Issue[];
  handleChange: ({ key, value }: { key: string; value: keyof Issue }) => void;
}

export default function IssuesTable({
  orderBy,
  issues,
  handleChange,
}: IssuesTableProps) {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => (
            <Table.ColumnHeaderCell key={col.value} className={col.className}>
              <button
                onClick={() => {
                  handleChange({ key: "orderBy", value: col.value });
                }}
              >
                {col.label}
              </button>
              {/* Show an indicator if a column header is clicked owner */}
              {col.value === orderBy && <ArrowUpIcon className="inline" />}
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
