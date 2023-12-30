import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { Issue, Status } from "@prisma/client";

interface IssueToolBarProps {
  status: Status | undefined;
  handleChange: ({
    key,
    value,
  }: {
    key: string;
    value: Status | keyof Issue;
  }) => void;
}

const IssueToolBar = ({
  status,
  handleChange,
}: IssueToolBarProps) => {
  return (
    <Flex justify="between" mb="5">
      <IssueStatusFilter status={status} handleChange={handleChange} />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueToolBar;
