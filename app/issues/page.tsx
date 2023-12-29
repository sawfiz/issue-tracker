import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import { IssueStatusBadge, IssueToolBar, Link } from "@/app/components";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}
const IssuesPage = async ({ searchParams }: Props) => {
  // Returns an array of enumerate values of an object
  const statuses = Object.values(Status);
  // Check if searchParams.value is valid
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; // prisma ignores filter with value undefined
  const issues = await prisma.issue.findMany({
    where: { status: status },
  });

  return (
    <div>
      <IssueToolBar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Updated
            </Table.ColumnHeaderCell>
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
                {issue.updatedAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

// Opt out of static rendering
export const dynamic = "force-dynamic";

export default IssuesPage;
