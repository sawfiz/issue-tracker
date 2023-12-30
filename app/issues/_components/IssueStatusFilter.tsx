"use client";
import { Issue, Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

// Type define `statuses` as an object array
// Each object has a type definition, where `value` is optional
const statuses: { label: string; value: Status | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

interface IssueToolBarProps {
  status: Status | undefined;
  handleChangeStatus: ({ status }: { status: Status | undefined }) => void;
}

const IssueStatusFilter = ({
  status,
  handleChangeStatus,
}: IssueToolBarProps) => {
  const router = useRouter();
  return (
    <Select.Root
      defaultValue={status}
      onValueChange={(selectedStatus: "ALL" | Status) => {
        const query: undefined | Status =
          selectedStatus === "ALL" ? undefined : selectedStatus;
        handleChangeStatus({status: query});
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((status) => (
            <Select.Item key={status.value} value={status.value || "ALL"}>
              {status.label}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
