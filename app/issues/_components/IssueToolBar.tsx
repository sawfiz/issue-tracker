import React from "react";
import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { Issue, Status } from "@prisma/client";

interface IssueToolBarProps {
  status: Status | undefined;
  handleChangeStatus: ({ status }: { status: Status | undefined }) => void;
}

const IssueToolBar = ({ status, handleChangeStatus }: IssueToolBarProps) => {
  return (
    <Flex justify="between" mb="5">
      <IssueStatusFilter
        status={status}
        handleChangeStatus={handleChangeStatus}
      />
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssueToolBar;
