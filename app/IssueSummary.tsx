import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

interface container {
  label: string;
  value: number;
  status: Status;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const containers: container[] = [
    { label: "Open", value: open, status: "OPEN" },
    { label: "In Progress", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed", value: closed, status: "CLOSED" },
  ];
  return (
    <Flex gap='4'>
      {containers.map((container) => (
        <Card key={container.value}>
          <Link
            className="text-sm font-medium"
            href={`/issues?status=${container.status}`}
          >
            <Flex direction="column" gap="1">
              {container.label}
              <Text size="5" className="font-bold">
                {container.value}
              </Text>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
