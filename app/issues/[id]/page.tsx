import React from "react";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import delay from "delay";

// For some reason writing this inline cause compile error
interface Props {
  params: { id: string };
}
// All the ids in the url is by default string
const IssuesDetailPage = async ({ params }: Props) => {
  // Validate the id is a number
  if (isNaN(parseInt(params.id))) notFound();

  // params is an object {id: "123"}
  // use parseInt() to convert string to an Int
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  await delay(1000);

  // The default not found page
  if (!issue) notFound();

  return (
    <div>
      <Heading>{issue.title}</Heading>

      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.updatedAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
};

export default IssuesDetailPage;
