import React from "react";
import { Heading, Flex, Text, Card } from "@radix-ui/themes";
import { IssueStatusBadge } from "@/app/components";
import ReactMarkdown from "react-markdown";
import { Issue } from "@prisma/client";

const IssueDetails = ({issue}:{issue: Issue}) => {
  return (
    <>
      <Heading>{issue.title}</Heading>

      <Flex gap="4" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.updatedAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full mt-4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default IssueDetails;
