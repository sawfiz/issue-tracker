import prisma from "@/prisma/client";
import {
  Avatar,
  Card,
  Flex,
  Heading,
  Table,
  TableColumnHeaderCell,
  Text,
} from "@radix-ui/themes";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  // Fetch using Prisma
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: {
      owner: true,
    },
  });

  return (
    <>
      <Card>
        <Heading size="4" mb="5">
          Latest Issues
        </Heading>
        <Table.Root>
          <Table.Body>
            {issues.map((issue) => {
              return (
                <Table.Row key={issue.id}>
                  <Table.Cell>
                    <Flex justify="between">
                      <Flex direction="column" align="start">
                        <Text>{issue.title}</Text>
                        <IssueStatusBadge status={issue.status} />
                      </Flex>
                      {issue.owner && (
                        <Avatar
                          src={issue.owner.image!}
                          fallback="?"
                          size="2"
                          radius="full"
                        />
                      )}
                    </Flex>
                  </Table.Cell>
                </Table.Row>
              );
            })}
            <Table.Row></Table.Row>
          </Table.Body>
        </Table.Root>
      </Card>
    </>
  );
};

export default LatestIssues;
